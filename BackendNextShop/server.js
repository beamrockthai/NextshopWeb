require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const sequelize = require("./src/Config/db");
const PrettyError = require("pretty-error");
const debug = require("debug")("app:routes");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const pe = new PrettyError();

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.set("trust proxy", 1); // ✅ สำหรับ secure cookie บน Render

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

sessionStore.sync();

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Unhandled Rejection at:",
    promise,
    "reason:",
    pe.render(reason)
  );
});

(async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start the server:", error.message);
  }
})();

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    debug(`🔹 ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
  }
});

process.on("SIGINT", async () => {
  console.log("🛑 Server is shutting down...");
  await sequelize.close();
  process.exit(0);
});

app.get("/Test", (req, res) => {
  res.send("Hello Thatchanon");
});
