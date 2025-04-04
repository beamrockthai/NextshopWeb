const { DataTypes } = require("sequelize");
const sequelize = require("../../Config/db");

const User = sequelize.define("User",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: true, // ไม่ให้มีค่าว่าง
      },
    
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
    role:{
        type: DataTypes.ENUM("user", "admin"), 
        allowNull: false,
        defaultValue: "user",
    },
});
module.exports = User;


























