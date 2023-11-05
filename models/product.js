const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title for the product"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price for the product"],
  },
  description: {
    type: String,
    required: [true, "Please add a description for the product"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
});
module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const getdb = require("../util/database").getdb;
// class Product {
//   constructor(title, price, description, imageUrl, id,userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id):null;
//     this.userId=userId;
//   }
//   save() {
//     const db = getdb();
//     let dbOp;
//     if (this._id) {
//       //  we will update the existing data
//       // const filter = { _id:new mongodb.ObjectId(this._id)}
//       // const update = {
//       //   $set: {
//       //     title:this.title ,price:this.price,description:this.description,imageUrl:this.imageUrl
//       //   }
//       // };
//       dbOp = db
//         .collection("products")
//         // .updateOne(filter,update);
//         .updateOne({ _id: this._id }, { $set: this });
//       console.log(`updated a new product with the id `);
//       // {title:this.title ,price:this.price,description:this.description,imageUrl:this.imageUrl}})
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//       console.log(`added a new product with the`);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(`added/updated a product `);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static fetchAll() {
//     const db = getdb();

//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products,'fetch all of product');
//         return products;
//       })

//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getdb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log("product is here");
//         return product;
//       });
//   }

//   static delete(prodId) {
//     const db = getdb();
//     return (
//       db
//         .collection("products")
//         // .find({ _id: new mongodb.ObjectId(prodId) })
//         .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//         .then(() => console.log("deleted"))
//     );

//     // deletone({ _id: prodid})).
//   }
// }

// module.exports = Product;
