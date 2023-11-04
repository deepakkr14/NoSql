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
  getCart() {
    const db = getdb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }
  deleteFromCart(productId) {
    console.log("i am calling");
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    console.log(" i am callin e 2");
    const db = getdb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectID(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getdb();
    return (
      this.getCart()
        .then((products) => {
          const order = {
            items: products,
            user: {
              _id: new ObjectID(this._id),
              name: this.name,
            },
          };
          return db.collection("orders").insertOne(order);
        })
        // .then(result=>{
        // this.cart ={ items:[]};
        // })
        // return db
        // .collection("users")
        // .insertOne(this.cart)
        .then((result) => {
          this.cart = { items: [] };
          return db
            .collection("users")
            .updateOne(
              { _id: new ObjectID(this._id) },
              { $set: { cart: { items: [] } } }
            );
        })
    );
  }
  getOrders(){
    const db=getdb();
    // return db.collection('orders').find({'user._id':new ObjectID(this._id)}).toArray();
  }
  static findById(userId) {
    const db = getdb();
    return db.collection("users").findOne({ _id: new ObjectID(userId) });
  }
}

module.exports = User;
