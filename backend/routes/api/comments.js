const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Snippet,Comment } = require('../../db/models');

const router = express.Router();

router.get("/comments/:snippetId",requireAuth,asyncHandler(async (req,res) => {
    const snippetId = req.params.snippetId
    const comments = await Comment.findAll({where:{snippet_id:snippetId}})
    return res.json({comments})
}))

router.post("/comments/:snippetId",requireAuth,asyncHandler(async (req,res) => {
    const snippetId = req.params.snippetId
    const {comment} = req.body
    const newComment = await Comment.create({comment,user_id:req.user.id,snippet_id:snippetId,createdAt:new Date.now(),updatedAt:new Date.now()})
    return res.json({newComment})
}))

router.put("/comments",requireAuth,asyncHandler(async (req,res)=> {
    const {comment,commentId} = req.body
    const updatedComment = await Comment.findByPk(commentId)
    updatedComment.comment = comment
    await updatedComment.save()
    return res.json({updatedComment})
}))

router.delete("/comments/delete/:id",requireAuth,asyncHandler(async (req,res) => {
const id = req.params.id
const deletedComment = await Comment.findByPk(id)
await deletedComment.destory()
return res.json({success:"The comment has been deleted."})
}))

module.exports = router;
