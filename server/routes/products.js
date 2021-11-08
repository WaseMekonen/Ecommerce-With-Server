

function getAllProduct(app, db) {
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
}

function createProduct(app, db) {
  app.post("/products", (req, res) => {
    // create product
  db.collection("products").insertOne(req.body);
  res.send(req.body);
})
}

function updateProductByiD(app, db) {
  app.patch("/products/:id", (req, res) => {
    // get id and new data and update them
    let id = req.params.id;
    const reqBody = req.body;
    // let id = req.params.id
    db.collection("products").updateOne(
      { _id: objectId(id) },
      { $set: reqBody }
    );
  });
}
function removeProductByID(app, db) {
  app.delete("/products/:id", (req, res) => {
    // todo: get id and remove product
    let id = req.params.id;
    db.collection("products").deleteOne({ _id: objectId(id) });
  });
}

module.exports = {
  getAllProduct,
  createProduct,
  updateProductByiD,
  removeProductByID,
};
