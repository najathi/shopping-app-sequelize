const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// one to many relationship
// Source: User, Target: Product (Product is belongs to User)
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

// one to one relationship
// Source: User, Target: Cart (Cart is belongs to User)
User.hasOne(Cart);
Cart.belongsTo(User);

// many to many relationship (This only works with an intermediate table that connects them which basically stores combination of ProductId and CartID). 'CartItem' is a intermediate TABLE.
// Source: Product, Target: Cart (Cart is belongs to Product)
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// one to many relationship
Order.belongsTo(User);
User.hasMany(Order);

// Many to many relationship
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

// sync({force: true}) - if any model changes that will update automatically.
sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
        //console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Najathi', email: 'najathi@live.com'});
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => console.log(err));

