const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const MongoConnect = require("./util/database").MongoConnect;
// const sequelize = require('./util/database');
const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('65472cdedfa8f4e03a9bb97e')
    .then((user) => {
      console.log(user, "app js ka req user");
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// MongoConnect(() =>{
//   app.listen(3000)
// });
mongoose
  .connect(
    "mongodb+srv://deep:wLx96Hj65FGYiQpn@cluster0.rpjyrmi.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((status) => {
    console.log('connected via mongoose')
    User.findOne().then(user=>{
      if(!user){
        const user=new User({
          name:'deep',
          email:'test@gmail.com',
          cart:{
            items:[]
          }
        });
        user.save();
      }
    })
    
    app.listen(3000);
  }).catch(err=>console.log(err));
