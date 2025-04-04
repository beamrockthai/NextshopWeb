const sequelize = require("./Config/db");
const User = require("./Users/model/user.model");

//Create Table
(async () => {
    try {
        await sequelize.sync({ alter: true }); // ใช้ force: true เพื่อรีเซ็ตตาราง (ลบแล้วสร้างใหม่)
        console.log("Database synchronized: All tables created table created.");
      } catch (error) {
        console.error("Error synchronizing the database:", error.message);
      } finally {
        await sequelize.close(); // ปิดการเชื่อมต่อ
      }
})();
