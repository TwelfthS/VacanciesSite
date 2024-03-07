'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE'
      })
      this.belongsToMany(models.User, {
        through: "UserVacancy",
        as: "subbedUser",
        foreignKey: 'vacancyId'
      })
    }
  }
  Vacancy.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    salary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ownerId: DataTypes.INTEGER,
    ownerName: DataTypes.STRING,
    open: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vacancy',
    timestamps: false
  });
  return Vacancy;
};