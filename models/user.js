const mongodb = require("mongodb");
const getdb = require("../util/database").getdb;
const ObjectID = mongodb.ObjectId;
class User {
  constructor(name, email) {
    this.username = name;
    this.email = email;
  }
  saveUser() {
    const db = getdb();
    let userCollection = db.collection("users");
    userCollection.insertOne(this).then((result) => {
      console.log("user saved");
    });
  }
  // static login(email) {
  //   const db = getdb();
  //   return db
  //     .collection("users")
  //     .find({ email })
  //     .limit(1)
  //     .next()
  //     .then((doc) => doc);
  // }

  static findById(userId) {
    const db = getdb();
    return db.collection("users").findOne({ _id: new ObjectID(userId) });
  }
}

module.exports = User;
