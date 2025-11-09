import Menu from "../model/MenuModel.js";

// ===========================
// GET ALL MENU
// ===========================
export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    
    console.log('\n========== ALL MENUS FROM DB ==========');
    menu.forEach((item, index) => {
      console.log(`\n[${index + 1}] ${item.title}`);
      console.log(`   URL Length: ${item.img ? item.img.length : 0} characters`);
      console.log(`   Full URL: ${item.img}`);
    });
    console.log('\n=========================================\n');
    
    res.status(200).json({
      success: true,
      message: "Get all menus success",
      data: menu,
    });
  } catch (error) {
    console.error("Get all menus error:", error);
    res.status(500).json({
      success: false,
      message: "Get menus failed",
      error: error.message,
    });
  }
};

// ===========================
// GET SINGLE MENU
// ===========================
export const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required",
      });
    }

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get menu success",
      data: menu,
    });
  } catch (error) {
    console.error("Get single menu error:", error);
    res.status(500).json({
      success: false,
      message: "Get menu failed",
      error: error.message,
    });
  }
};

// ===========================
// CREATE NEW MENU (ADMIN ONLY)
// ===========================
export const createMenu = async (req, res) => {
  try {
    const { title, description, price, img } = req.body;

    console.log("Creating menu:", { title, description, price, img });

    if (!title || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description and price",
      });
    }

    const newMenu = await Menu.create({
      title,
      description,
      price: Number(price),
      img: img || "",
    });

    console.log("Menu created:", newMenu._id);

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: newMenu,
    });
  } catch (error) {
    console.error("Create menu error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating menu",
      error: error.message,
    });
  }
};

// ===========================
// UPDATE MENU (ADMIN ONLY)
// ===========================
export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, img } = req.body;

    console.log("Updating menu:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = Number(price);
    if (img) updateData.img = img;

    const updatedMenu = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    console.log("Menu updated:", id);

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: updatedMenu,
    });
  } catch (error) {
    console.error("Update menu error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating menu",
      error: error.message,
    });
  }
};

// ===========================
// DELETE MENU (ADMIN ONLY)
// ===========================
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting menu:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required",
      });
    }

    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    console.log("Menu deleted:", id);

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
      data: deletedMenu,
    });
  } catch (error) {
    console.error("Delete menu error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting menu",
      error: error.message,
    });
  }
};
