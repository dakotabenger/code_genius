'use strict';
module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    snippet_id: DataTypes.INTEGER,
    line_text: DataTypes.STRING,
    number: DataTypes.INTEGER,
  }, {});
  Line.associate = function(models) {
    Line.belongsTo(models.Snippet, {foreignKey: "snippet_id"})
    Line.hasMany(models.Annotation,{foreignKey:"line_id",onDelete:'cascade',hooks:true})
  };
  return Line;
};