const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
// const MongoConnect = () => {
//   MongoClient.connect(
//     "mongodb+srv://deep:wLx96Hj65FGYiQpn@cluster0.rpjyrmi.mongodb.net/?retryWrites=true&w=majority"
//   )
//     .then((client) => {
//       console.log("connected");
//       console.log(client)
//       // callback();
//       db = client.db();
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };
// const getdb = () => {
//   if (db) {
//     return db;
//   }
//   throw " no database found!";
// };
// module.exports = MongoConnect;

const mongoConnect = callback => {
  MongoClient.connect(
   "mongodb+srv://deep:wLx96Hj65FGYiQpn@cluster0.rpjyrmi.mongodb.net/?retryWrites=true&w=majority"
)
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getdb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};


exports.getdb = getdb;
exports.MongoConnect = mongoConnect;
