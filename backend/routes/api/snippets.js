const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Snippet,Line,Annotation,User } = require('../../db/models');

const router = express.Router();

router.get("/snippets",asyncHandler(async (req,res) => {
    const snippets = await Snippet.findAll({order:[[Line,'number','ASC']],include:[
        {model:Line,
        include: [ {
            model: Annotation,include: {model:User}
            },
]},{model:User}
]})
    return res.json({snippets})
}))

router.post("/snippets",requireAuth,asyncHandler(async (req,res) => {
    const {title,lines} = req.body
    console.log(lines,"req")
    console.log(req.user.id,"here")
    const newSnippet = await Snippet.create({user_id:req.user.id,title:title,createdAt:new Date,updatedAt:new Date})
    await Promise.all(lines.map(async (line) => {
        const newLine = await Line.create({line_text:line.lineText,snippet_id:newSnippet.id,number:line.number,createdAt:new Date,
            updatedAt: new Date})
            console.log(newLine.line_text,"forEach")
            return newLine
        }));
    console.log(newSnippet.id,"id")
    let {id} = newSnippet
    const snippet = await Snippet.findByPk(id,{
        include: [
        {
          model: Line,
          where: {snippet_id:id},
          include: [
              {model: Annotation,where:{snippet_id:id},required:false,include:{model:User,required:false}},
            ]
        },
      ]})
        console.log(snippet,"before the forEach")
    return res.json({snippet})
}))

router.get("/snippets/:id",requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const snippet = await Snippet.findOne({
        where:{id},
        order:[[Line,'number','ASC']],
        include:[
            {model:Line,
            where:{snippet_id:id},
                include: {
                    model: Annotation,
                    where: {snippet_id:id},
                    required:false,
                    include:[
                        {model:User,required:false},
                    ]
                }

            }
        
        ]
        })
    if (snippet["user_id"] !== req.user.id || !snippet) {
        const error = "Something went wrong here"
        return res.json({error})
    }
    return res.json({snippet})
}))

router.put("/snippets/:id",requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const {title,lines} = req.body
    const updatedSnippet = await Snippet.findByPk(id)
    const error = "You are not the owner of this snippet"
    if (req.user.id !== updatedSnippet["user_id"]) return res.json(error)
    updatedSnippet.title = title 
    lines.forEach(async (line) => {
        const newLine = await Line.findByPk(line.id)
        newLine[line_text] = line.lineText
        await newLine.save() 
    });
    await updatedSnippet.save()
    return res.json({updatedSnippet})
}))

router.delete("/snippets/:id",requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const deletedSnippet = await Snippet.findByPk(id)
    if (deletedSnippet["user_id"] !== req.user.id) return res.json({error:"You are not the owner of this snippet."})
    await deletedSnippet.destroy()
    res.json({success:"You're snippet has been deleted"})
}))



module.exports = router;