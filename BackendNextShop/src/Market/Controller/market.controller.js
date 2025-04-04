const Market = require("../../Market/model/market.model");

//create function ก่อน
exports.createMarket = async (req, res) => {
  try {
    const market = await Market.create(req.body);
    res.status(200).json({ success: true, data: market });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get id
exports.getIdMarket = async (req, res) => {
  try {
    const market = await Market.findByPk(req.params.id);

    if (!market) {
      return res.status(404).json({
        success: false,
        message: "market not found",
      });
    }
    res.status(200).json({
      success: true,
      data: market, // คืน Body ทั้งหมด
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all
exports.getAllMarkets = async (req, res) => {
  try {
    const market = await Market.findAll();
    res.status(200).json({
      success: true,
      data: market,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Update
exports.getUpdateMarket = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const marketId = req.params.id;

    // ค้นหา Job ที่ต้องการแก้ไข
    const market = await Market.findByPk(marketId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!market) {
      return res
        .status(404)
        .json({ success: false, message: "market not found" });
    }

    // อัปเดตข้อมูล
    const updatedmarket = await market.update(req.body); // ใช้ req.body เป็นข้อมูลใหม่

    // ส่งข้อมูลที่อัปเดตกลับ
    res.status(200).json({
      success: true,
      data: updatedmarket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Delete
exports.deleteMarket = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const marketId = req.params.id;

    // ค้นหา Job ที่ต้องการลบ
    const market = await Market.findByPk(marketId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!market) {
      return res
        .status(404)
        .json({ success: false, message: "market not found" });
    }

    // ลบข้อมูล
    await market.destroy();

    // ส่งข้อความยืนยันการลบ
    res.status(200).json({
      success: true,
      message: "Market deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
