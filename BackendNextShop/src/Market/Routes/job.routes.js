const express = require("express");
const {
  createMarket,
  getIdMarket,
  getAllMarkets,
  getUpdateMarket,
  deleteMarket,
} = require("../../Market/Controller/market.controller");

const router = express.Router();

router.post("/Market", createMarket);
router.get("/Market/:id", getIdMarket);
router.get("/Markets", getAllMarkets);
router.put("/Market/:id", getUpdateMarket);
router.delete("/Market/:id", deleteMarket);

module.exports = router;
