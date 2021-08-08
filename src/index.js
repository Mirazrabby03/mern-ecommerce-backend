const express = require('express');
const env = require('dotenv');
const app = express();
const path = require('path');
//require("./db/conn");
const mongoose = require('mongoose');
const cors = require('cors');

//environmental variable 
env.config();  
//mongoDB connection
//mongodb+srv://root:<password>@cluster0.5z7fm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.5z7fm.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log(`connection successful`);
}).catch((e) =>{
    console.log(`no connection`);
})

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
 const cartRoutes = require('./routes/cart');
const addressRoutes = require("./routes/address");
const initialDataRoutes = require('./routes/admin/initialData');
const orderRoutes = require("./routes/order");
const adminOrderRoute = require('./routes/admin/order.routes');
//Middleware
app.use(cors());
app.use(express.json()); 
app.use('/public',express.static(path.join(__dirname, 'uploads'))); 

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes); 
app.use('/api', productRoutes);
app.use("/api", addressRoutes);
// app.use('/api', (() =>{
// const express = require('express');
// const {requireSignin, userMiddleware} = require('../../mern-backend/src/common-middleware/index')
// const cart = require('../../mern-backend/src/controller/cart')
// const router = express.Router();
// router.post('/user/cart/addtocart', requireSignin, userMiddleware, cart.addItemToCart);
// router.post('/user/getCartItems', requireSignin, userMiddleware, cart.getCartItems);  
// return router;
// }));

 app.use('/api', cartRoutes);

app.use('/api', initialDataRoutes);
app.use("/api", orderRoutes);
app.use('/api', adminOrderRoute);

const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.log(`server is running at port ${port}`);
});    