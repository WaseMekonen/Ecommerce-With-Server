function getCartByID(app,db){
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
}

function createNewCart(app,db){
    app.post("/carts", (req, res) => {
        // create new cart
        db.collection('carts').insertOne(req.body)
        res.send("hello 1");
      });
}

function addItemToCart(app,db){
  app.patch("/carts/add", (req, res) => {
    // todo: add item to cart
      const reqBody = req.body;
      // let id = req.params.id
      db.collection("carts").updateOne({"_id":objectId("61894fb3dbaa8fbb70c56aaa")},{$push:{products:reqBody}});
    res.send("this is add to cart ");
  });
}

function removeItemToCart(app,db){
  app.patch("/carts/delete", (req, res) => {
    // todo: delete items from cart
    db.collection("carts").updateOne({"_id":objectId("61894fb3dbaa8fbb70c56aaa")},{$pull:{products:req.body}})
    res.send("Hello 4");
  });
}
module.exports = {createNewCart,getCartByID,addItemToCart,removeItemToCart};