const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Annotation } = require('../../db/models');

const router = express.Router();

router.get("/annotations/:lineId",requireAuth,asyncHandler(async (req,res) => {
    const lineId = req.params.lineId
    const annotations = await Annotation.findAll({where:{line_id:lineId}})
    if (!annotations) return res.json({error:"There are no annotations for this line. Know what this line is doing? Add an Annotation!"}) 
    return res.json({annotations})
}))

router.post("/annotations",requireAuth,asyncHandler(async (req,res) => {
    const {lineId,annotation,voteTotal} = req.body
    const newAnnotation = await Annotation.create({line_id:lineId,annotation,vote_total:voteTotal,user_id:req.user.id,createdAt:new Date.now(),updatedAt:new Date.now()})
    res.json({newAnnotation})
}))

router.delete("/annotations/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id
    const deletedAnnotation = await Annotation.findByPk(annotationId)
    await deletedAnnotation.destroy()
    return res.json({deletedAnnotation})
}))

router.put("/annotations/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id 
    const {annotation} = req.body
    const updatedAnnotation = await Annotation.findByPk(annotationId)
    updatedAnnotation.annotation = annotation
    await updatedAnnotation.save()
    return res.json({updatedAnnotation})
}))

router.put("/annotations/vote/:id",requireAuth,asyncHandler(async (req,res) => {
    const annotationId = req.params.id
    const {vote} = req.body
    const votedOnAnnotation = await Annotation.findByPk(annotationId)
    if (vote) votedOnAnnotation[vote_total] = votedOnAnnotation[vote_total] + 1
    if (!vote) votedOnAnnotation[vote_total] = votedOnAnnotation[vote_total] - 1
    await votedOnAnnotation.save()
    return res.json({votedOnAnnotation})
}))
module.exports = router;
