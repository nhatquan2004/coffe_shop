import Promotion from "../model/Promotion.js";

export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({
      success: true,
      count: promotions.length,
      data: promotions,
    });
  } catch (error) {
    console.error("Get promotions error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ success: false, error: "Promotion not found" });
    }
    res.status(200).json({ success: true, data: promotion });
  } catch (error) {
    console.error("Get promotion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createPromotion = async (req, res) => {
  try {
    const { name, description, discount, startDate, endDate } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, error: "Promotion name is required" });
    }
    if (discount === undefined || discount < 0) {
      return res.status(400).json({ success: false, error: "Valid discount is required" });
    }
    const newPromotion = new Promotion({
      name: name.trim(),
      description: description || "",
      discount,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await newPromotion.save();
    console.log("Promotion created:", newPromotion._id);
    res.status(201).json({
      success: true,
      message: "Promotion created successfully",
      data: newPromotion,
    });
  } catch (error) {
    console.error("Create promotion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!promotion) {
      return res.status(404).json({ success: false, error: "Promotion not found" });
    }
    console.log("Promotion updated:", promotion._id);
    res.status(200).json({
      success: true,
      message: "Promotion updated successfully",
      data: promotion,
    });
  } catch (error) {
    console.error("Update promotion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ success: false, error: "Promotion not found" });
    }
    console.log("Promotion deleted:", promotion._id);
    res.status(200).json({
      success: true,
      message: "Promotion deleted successfully",
      data: promotion,
    });
  } catch (error) {
    console.error("Delete promotion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
