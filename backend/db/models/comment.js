'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    snippet_id: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: "user_id"})
    Comment.belongsTo(models.Snippet, {foreignKey: "snippet_id"})
  };
  return Comment;
};