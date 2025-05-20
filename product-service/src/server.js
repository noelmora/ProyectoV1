const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3002;

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 900 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/check-user/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const userId = req.params.id;
    const response = await axios.get(
      `http://user-service:3001/users/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.json({ exists: true, user: response.data });
  } catch (error) {
    res.status(404).json({ exists: false, user: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
