'use strict';
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('Annotation', {
    user_id: DataTypes.INTEGER,
    line_id: DataTypes.INTEGER,
    annotation: DataTypes.STRING,
    vote_total: DataTypes.INTEGER
  }, {});
  Annotation.associate = function(models) {
    Annotation.belongsTo(models.Line, {foreignKey: "line_id"})
    Annotation.belongsTo(models.User, {foreignKey: "user_id"})
    Annotation.belongsTo(models.Snippet,{foreignKey:"snippet_id"})
  };
  return Annotation;
};