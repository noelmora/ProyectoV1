const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const PORT = 3003;

let orders = [
  {
    id: 1,
    userId: 1,
    productId: 2,
  },
];

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", async (req, res) => {
  const token = req.headers.authorization;
  const { userId, productId } = req.body;

  try {
    //Verificar que exista el usuario
    const userRes = await axios(`http://user-service:3001/users/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
    //Verificar que exista el producto
    const productRes = await axios(
      `http://product-service:3002/products/${productId}`
    );

    const newOrder = {
      id: orders.length + 1,
      userId,
      productId,
    };

    orders.push(newOrder);
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear orden", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
