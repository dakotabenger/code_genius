const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Annotation,Line } = require('../../db/models');

const router = express.Router();

router.get("/annotations/:lineId",requireAuth,asyncHandler(async (req,res) => {
    const lineId = req.params.lineId
    const annotations = await Annotation.findAll({where:{line_id:lineId},include:{model:Line,required:false}})
    const line = await Line.findByPk(lineId,{include: {model:Annotation,required:false}})
    if (!annotations || !line) return res.json({error:"There are no annotations for this line. Know what this line is doing? Add an Annotation!"}) 
    return res.json({annotations,line})
}))

router.post("/annotations",requireAuth,asyncHandler(async (req,res) => {
    const {lineId,annotation,voteTotal} = req.body
    const newRecord = await Annotation.create({line_id:lineId,annotation,vote_total:voteTotal,user_id:req.user.id,createdAt:new Date,updatedAt:new Date})
    const newAnnotation = await Line.findByPk(lineId,{include:{model:Annotation}})
    return res.json({newAnnotation})
}))

router.delete("/annotations/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id
    const deletedAnnotation = await Annotation.findByPk(annotationId)
    if (deleteAnnotation.user_id === req.user.id) {
    await deletedAnnotation.destroy()
    return res.json({deletedAnnotation})
    } else {
        return res.json({error:"Something went wrong"})
    }
}))

router.put("/annotations/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id 
    const {annotation} = req.body
    console.log("-------------------------------------",annotation,"--------------------------------------------------------")
    const updatedAnnotation = await Annotation.findByPk(annotationId)
    updatedAnnotation.annotation = annotation
    console.log(updatedAnnotation.annotation)
    await updatedAnnotation.save()
    await updatedAnnotation.reload()
    const updatedLine = await Line.findByPk(updatedAnnotation.line_id,{include:{model: Annotation,required:false}})
    return res.json({updatedLine})
}))

router.put("/annotations/vote/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id
    const {vote} = req.body
    const votedOnAnnotation = await Annotation.findByPk(annotationId)
    if (vote) votedOnAnnotation["vote_total"] = votedOnAnnotation["vote_total"] + 1
    if (!vote) votedOnAnnotation["vote_total"] = votedOnAnnotation["vote_total"] - 1
    await votedOnAnnotation.save()
    const line = await Line.findByPk(votedOnAnnotation.line_id,{include: {model:Annotation,where:{id:annotationId}}})
    return res.json({line})
}))
module.exports = router;
