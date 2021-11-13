const express = require("express"),
  mongoDb = require("mongodb"),
  mongoClient = mongoDb.MongoClient,
  path = require("path"),
  app = express(),
  PORT = 8080,
  // URL = process.env.MongoURL || "mongodb://localhost:27017",
  clientPath = path.join(__dirname, "..", "client"),
  { getAllProduct,createProduct,updateProductByiD,removeProductByID,} = require("./routes/products"),
  {createNewCart,getCartByID,addItemToCart,removeItemFromCart,} = require("./routes/carts"),
  {createNewMessage, getAllmessages}= require("./routes/contact");
const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.MONGO_URL;

app.use(express.static(clientPath));
app.use(express.json());

mongoClient.connect(URL, (err, mongo) => {
  if (err) {
    console.log(err);
  }
  const db = mongo.db("ecommerce");
  // Products:
  getAllProduct(app, db);
  createProduct(app, db);
  updateProductByiD(app, db);
  removeProductByID(app, db);
  // Cart:
  addItemToCart(app, db);
  createNewCart(app, db);
  getCartByID(app, db);
  removeItemFromCart(app, db);
  // Contact:
  createNewMessage(app, db);
  getAllmessages(app, db);
});

app.listen(PORT, () => {
  console.log(`app is listening to port:${PORT}`);
});
