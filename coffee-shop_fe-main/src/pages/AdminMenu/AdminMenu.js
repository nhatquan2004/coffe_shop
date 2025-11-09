// src/pages/AdminMenu/AdminMenu.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createMenu, updateMenu, deleteMenu, getAllMenus } from "../../services/menuService";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
  });

  // ===========================
  // LOAD ALL MENUS
  // ===========================
  const loadMenus = async () => {
    try {
      setLoading(true);
      const response = await getAllMenus();
      console.log("📥 Response:", response);

      let menuData = [];
      if (response?.success && Array.isArray(response?.data)) {
        menuData = response.data;
      } else if (Array.isArray(response?.data)) {
        menuData = response.data;
      } else if (Array.isArray(response)) {
        menuData = response;
      }

      setMenus(menuData);
      console.log("✅ Menus loaded:", menuData.length);
    } catch (error) {
      console.error("❌ Load error:", error);
      setMenus([]);
      setMessage({
        type: "error",
        text: "Failed to load menus",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  // ===========================
  // HANDLE INPUT CHANGE
  // ===========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ===========================
  // HANDLE IMAGE CHANGE
  // ===========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Preview ảnh
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      console.log("✅ Image selected:", file.name);
    }
  };

  // ===========================
  // UPLOAD IMAGE TO BACKEND
  // ===========================
  const uploadImage = async () => {
    if (!imageFile) {
      setMessage({ type: "warning", text: "⚠️ Chưa chọn ảnh!" });
      return null;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log("✅ Upload success:", data);
      return data.filePath; // "/images/filename.jpg"
    } catch (error) {
      console.error('❌ Upload error:', error);
      setMessage({ type: "error", text: "❌ Upload ảnh thất bại!" });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // ===========================
  // HANDLE SUBMIT (CREATE / UPDATE)
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.price) {
        setMessage({
          type: "error",
          text: "❌ Vui lòng điền đầy đủ thông tin!",
        });
        setLoading(false);
        return;
      }

      // Check if image is needed (for create) or optional (for update)
      let imgPath = formData.img;

      if (!editingId && !imageFile) {
        // CREATE: must have image
        setMessage({
          type: "error",
          text: "❌ Vui lòng chọn ảnh!",
        });
        setLoading(false);
        return;
      }

      if (imageFile) {
        // Upload new image
        console.log("📤 Uploading image...");
        imgPath = await uploadImage();
        
        if (!imgPath) {
          setLoading(false);
          return;
        }
      }

      // Prepare data to send
      const menuDataToSend = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        img: imgPath,
      };

      if (editingId) {
        // UPDATE
        console.log("📝 Updating:", editingId, menuDataToSend);
        const response = await updateMenu(editingId, menuDataToSend);
        console.log("✅ Update response:", response);

        setMessage({
          type: "success",
          text: "✅ Menu cập nhật thành công!",
        });
        setFormData({ title: "", description: "", price: "", img: "" });
        setImageFile(null);
        setImagePreview("");
        setEditingId(null);
        setTimeout(() => loadMenus(), 300);
      } else {
        // CREATE
        console.log("📝 Creating:", menuDataToSend);
        const response = await createMenu(menuDataToSend);
        console.log("✅ Create response:", response);

        setMessage({
          type: "success",
          text: "✅ Menu tạo mới thành công!",
        });
        setFormData({ title: "", description: "", price: "", img: "" });
        setImageFile(null);
        setImagePreview("");
        setTimeout(() => loadMenus(), 300);
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      setMessage({
        type: "error",
        text: error.message || "❌ Lỗi khi lưu menu",
      });
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // HANDLE EDIT
  // ===========================
  const handleEdit = (menu) => {
    setEditingId(menu._id);
    setFormData({
      title: menu.title,
      description: menu.description,
      price: menu.price,
      img: menu.img || "",
    });
    setImageFile(null);
    setImagePreview("");
    window.scrollTo(0, 0);
  };

  // ===========================
  // HANDLE DELETE
  // ===========================
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa menu này?")) {
      try {
        setLoading(true);
        console.log("🗑️ Deleting:", id);
        const response = await deleteMenu(id);
        console.log("✅ Delete response:", response);

        setMessage({
          type: "success",
          text: "✅ Menu xóa thành công!",
        });
        setTimeout(() => loadMenus(), 300);
      } catch (error) {
        console.error("❌ Delete error:", error);
        setMessage({
          type: "error",
          text: error.message || "❌ Lỗi khi xóa menu",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // ===========================
  // HANDLE CANCEL
  // ===========================
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", price: "", img: "" });
    setImageFile(null);
    setImagePreview("");
    setMessage({ type: "", text: "" });
  };

  return (
    <section className="admin-menu">
      <Container>
        <h1 className="admin-title">Manage Menu Items</h1>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <Row>
          <Col lg="5">
            <div className="admin-form-box">
              <h3>{editingId ? "Edit Menu Item" : "Add New Menu Item"}</h3>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="title">Title *</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Americano Coffee"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description *</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Milk with vanilla flavored"
                    rows="3"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="price">Price (USD) *</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 50.25"
                    step="0.01"
                    required
                  />
                </FormGroup>

                {/* ✅ IMAGE UPLOAD INPUT */}
                <FormGroup>
                  <Label for="imageFile">
                    {editingId ? "Change Image (Optional)" : "Upload Image *"}
                  </Label>
                  <Input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  {uploading && (
                    <small style={{ color: "blue" }}>⏳ Uploading...</small>
                  )}
                </FormGroup>

                {/* ✅ IMAGE PREVIEW */}
                {imagePreview && (
                  <div className="image-preview" style={{ marginBottom: "15px" }}>
                    <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                      📷 Preview ảnh:
                    </p>
                    <img
                      src={imagePreview}
                      alt="preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        borderRadius: "8px",
                        border: "2px solid #ddd",
                      }}
                    />
                  </div>
                )}

                {/* ✅ OLD IMAGE DISPLAY (WHEN EDITING) */}
                {editingId && formData.img && !imagePreview && (
                  <div className="image-preview" style={{ marginBottom: "15px" }}>
                    <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                      📷 Current Image:
                    </p>
                    <img
                      src={`http://localhost:5000${formData.img}`}
                      alt="current"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        borderRadius: "8px",
                        border: "2px solid #ddd",
                      }}
                    />
                  </div>
                )}

                <div className="form-buttons">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={loading || uploading}
                  >
                    {loading || uploading
                      ? "Saving..."
                      : editingId
                      ? "Update"
                      : "Create"}
                  </Button>
                  {editingId && (
                    <Button
                      color="secondary"
                      type="button"
                      onClick={handleCancel}
                      disabled={loading || uploading}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </Col>

          <Col lg="7">
            <div className="admin-list-box">
              <h3>Menu Items List ({menus.length})</h3>

              {loading && !menus.length ? (
                <p className="loading">Loading...</p>
              ) : menus.length === 0 ? (
                <p className="no-items">No menu items yet. Create one!</p>
              ) : (
                <div className="menu-list">
                  {menus.map((menu) => (
                    <div key={menu._id} className="menu-item">
                      {/* ✅ DISPLAY IMAGE */}
                      {menu.img && (
                        <div
                          className="item-image"
                          style={{
                            width: "80px",
                            height: "80px",
                            minWidth: "80px",
                            overflow: "hidden",
                            borderRadius: "8px",
                            marginRight: "12px",
                          }}
                        >
                          <img
                            src={`http://localhost:5000${menu.img}`}
                            alt={menu.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}

                      <div className="item-info">
                        <h4>{menu.title}</h4>
                        <p className="description">{menu.description}</p>
                        <p className="price">${menu.price}</p>
                      </div>
                      <div className="item-actions">
                        <Button
                          color="info"
                          size="sm"
                          onClick={() => handleEdit(menu)}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(menu._id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminMenu;