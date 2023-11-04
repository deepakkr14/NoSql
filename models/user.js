const mongodb = require("mongodb");
const getdb = require("../util/database").getdb;
const ObjectID = mongodb.ObjectId;
class User {
  constructor(name, email, cart, id) {
    this.username = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  saveUser() {
    const db = getdb();
    let userCollection = db.collection("users");
    userCollection.insertOne(this).then((result) => {
      console.log("user saved", result);
    });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      console.log(this.cart.items);
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectID(product._id),
        quantity: newQuantity,
      });
    }
    // if cart contains the product already then increase the count
    // else push it to the array of items in the cart

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getdb();
    return db.collection("users").updateOne(
      {
        _id: new ObjectID(this._id),
      },
      { $set: { cart: updatedCart } }
    );

    // const updatedCart={items:[{productId:new ObjectID(product._id),quantity:1}]}
    // const db =getdb();
    // return db.collection('users').updateOne({
    //   _id:new ObjectID(this._id)
    // },{$set:{cart:updatedCart}});
  }

  static findById(userId) {
    const db = getdb();
    return db.collection("users").findOne({ _id: new ObjectID(userId) });
  }
}

module.exports = User;
