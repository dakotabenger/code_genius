const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Snippet,Line,Annotation } = require('../../db/models');

const router = express.Router();

router.get("/snippets",requireAuth,asyncHandler(async (req,res) => {
    const snippets = await Snippet.findAll()
    return res.json({snippets})
}))

router.post("/snippets",requireAuth,asyncHandler(async (req,res) => {
    const {title,lines} = req.body
    console.log(req.user.dataValues.id)
    const newSnippet = await Snippet.create({user_id:req.user.id,title:title,createdAt:new Date,updatedAt:new Date})
    lines.forEach(async (line) => {
        const newLine = await Line.create({line_text:line.lineText,snippet_id:newSnippet.id,number:line.number,createdAt:new Date,
            updatedAt: new Date})
    });
    return res.json({newSnippet})
}))

router.get("/snippets/:id",requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const snippet = await Snippet.findOne({
        where:{id},
        include:[
            {model:Line,
            where:{snippet_id:id},
            order:[[Line,'number','ASC']],
                include: {
                    model: Annotation,
                    where: {snippet_id:id}
                }
            }]})
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
        const newLine = await Line.findByPk(list.id)
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