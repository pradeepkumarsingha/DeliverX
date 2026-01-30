import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import Api from "../../services/Api";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("❌ Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", Number(product.price));
      if (
  product.originalPrice !== "" &&
  Number(product.originalPrice) > Number(product.price)
) {
  formData.append("originalPrice", product.originalPrice);
}

      formData.append("category", product.category);


      formData.append("description", product.description);
      formData.append("stock", Number(product.stock));
      formData.append("image", imageFile); // MUST MATCH upload.single("image")

      // 🔥 IMPORTANT: correct API path
      await Api.post("/seller/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully");
      
      setProduct({
        name: "",
        price: "",
        originalPrice: "",
        category: "",
        description: "",
        stock: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Add New Product
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        fullWidth
        margin="normal"
        value={product.name}
        onChange={handleChange}
      />

    <TextField
  label="MRP (Original Price)"
  name="originalPrice"
  type="number"
  fullWidth
  margin="normal"
  value={product.originalPrice || ""}
  onChange={handleChange}
  helperText="Optional. Used to show discount"
  inputProps={{ min: 0 }}
/>

<TextField
  label="Selling Price (INR)"
  name="price"
  type="number"
  fullWidth
  margin="normal"
  value={product.price}
  onChange={handleChange}
  required
  inputProps={{ min: 0 }}
/>


      <TextField
        label="Category"
        name="category"
        select
        fullWidth
        margin="normal"
        value={product.category}
        onChange={handleChange}
      >
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Fashion">Fashion</MenuItem>
        <MenuItem value="Grocery">Grocery</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
      </TextField>

      {/* Image Upload */}
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
      >
        Upload Product Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>

      {imageFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {imageFile.name}
        </Typography>
      )}

      <TextField
        label="Stock"
        name="stock"
        type="number"
        fullWidth
        margin="normal"
        value={product.stock}
        onChange={handleChange}
      />

      <TextField
        label="Description"
        name="description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={product.description}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Add Product"}
      </Button>
    </Paper>
  );
};

export default AddProduct;
