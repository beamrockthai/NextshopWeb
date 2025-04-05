const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
  // ✅ ใช้ DATABASE_URL จาก Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
  });
} else {
  // 🔧 fallback สำหรับ local dev
  sequelize = new Sequelize(
    process.env.DB_NAME || "postgres",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      dialect: "postgres",
      logging: false,
    }
  );
}

// ทดสอบการเชื่อมต่อ
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ GoToGundum (DB connected)");
  } catch (error) {
    console.error("❌ NoToGundum (DB failed):", error.message);
  }
})();

module.exports = sequelize;
