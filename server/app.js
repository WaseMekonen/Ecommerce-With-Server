const express = require("express"),
{
  getAllProduct,
  createProduct,
  updateProductByiD,
  removeProductByID,
} = require("./routes/products"),
{createNewCart,getCartByID,addItemToCart,removeItemToCart} = require("./routes/carts");
  path = require("path"),
  app = express(),
  PORT = 8080,
  mongoDb = require("mongodb"),
  mongoClient = mongoDb.MongoClient,
  objectId = mongoDb.ObjectId,
  URL = "mongodb://localhost:27017",
  clientPath = path.join(__dirname, "..", "client"),

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

  addItemToCart(app,db)
  createNewCart(app,db)
  getCartByID(app,db)
  removeItemToCart(app,db)
  // Contact:

  app.post("/contact", (req, res) => {
    // todo: create a new message
    
    res.send("hello 5");
  });

  app.get("/contact", (req, res) => {
    // todo: get all the messages
    res.send("Hello 6");
  });
});

app.listen(PORT, () => {
  console.log(`app is listening to port:${PORT}`);
});

