'use strict';
module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define('Snippet', {
    title: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Snippet.associate = function(models) {
    Snippet.belongsTo(models.User, {foreignKey: "user_id"})
    Snippet.hasMany(models.Line,{foreignKey:"snippet_id"})
    Snippet.hasMany(models.Annotation,{foreignKey:"snippet_id"})
  };
  return Snippet;
};