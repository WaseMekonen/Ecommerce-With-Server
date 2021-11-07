const express = require("express"),
  path = require("path"),
  app = express(),
  PORT = 8080,
  mongoDb = require("mongodb"),
  mongoClient = mongoDb.MongoClient,
  objectId = mongoDb.ObjectId,
  URL = "mongodb://localhost:27017",
  clientPath = path.join(__dirname, "..", "client");

app.use(express.static(clientPath));
app.use(express.json());

mongoClient.connect(URL, (err, mongo) => {
  if (err) {
    console.log(err);
  }
  const db = mongo.db("ecommerce");
// Products:

  app.post("/products", (req, res) => {
    // create product
    try {
      db.collection("products").insertOne(req.body);
    } catch (error) {
      res.status(400).send();
    }
  });

  app.get("/products", (req, res) => {
    //return all products
    db.collection("products")
      .find({})
      .toArray((err, col) => {
        if (err) {
          console.log(err);
        }
        res.send(col);
      });
  });

  app.patch("/products/:id", (req, res) => {
    // todo: get id and new data and update them
    let id = req.params.id;
    const reqBody = req.body;
    // let id = req.params.id
    db.collection("products").updateOne(
      { _id: objectId(id) },
      { $set: reqBody }
    );
  });

  app.delete("/products/:id", (req, res) => {
    // todo: get id and remove product
    let id = req.params.id;
    db.collection("products").deleteOne({ _id: objectId(id) });
  });

// Cart:

  app.post("/carts", (req, res) => {
    // create new cart
    db.collection('carts').insertOne(req.body)
    res.send("hello 1");
  });

  app.get("/carts/:id", (req, res) => {
    //  get id and return a cart
    db.collection('carts').findOne({_id:objectId(req.params.id)},(err,cart)=>{
      if(err){
        console.log(err);
      }
      res.send(cart);
    })
    // res.send("Hello 2");
  });

  app.patch("/carts/delete", (req, res) => {
    // todo: delete items from cart

    res.send("Hello 4");
  });

  app.patch("/carts/add", (req, res) => {
    // todo: add item to cart

    res.send("Hello 5");
  });

// Contact:

  app.post("/contact", (req, res) => {
    // todo: create a new message
    res.send("hello 4");
  });

  app.get("/contact", (req, res) => {
    // todo: get all the messages
    res.send("Hello 5");
  });
});

app.listen(PORT, () => {
  console.log(`app is listening to port:${PORT}`);
});
