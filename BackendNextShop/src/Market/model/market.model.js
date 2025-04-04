const { DataTypes } = require("sequelize");
const sequelize = require("../../Config/db");

const Market = sequelize.define("Market", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Market;
