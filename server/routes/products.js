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