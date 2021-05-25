const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/react-redux-shopping-cart-db",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    dscription: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

// api.post("/api/products", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     console.log(req.body);
//     const savedProduct = await newProduct.save();
//     res.send(savedProduct);
//   } catch (error) {
//     alert(error);
//   }
// });

app.delete("/api/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
