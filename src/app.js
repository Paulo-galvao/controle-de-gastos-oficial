import e from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
// import productRoutes from './models/Product.js';
// import categoryRoutes from './models/Category.js';

const port = process.env.API_PORT;

const app = e();

/**
 * Config
 */
app.use(e.urlencoded({extended: true}));
app.use(e.json());
// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');
// Static
app.use(e.static('src/public'));
// Session
app.use(session({
    secret: "finance-control",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

/**
 * Routes
 */

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRoutes);
// app.use('/product', productRoutes);
// app.use('/category', categoryRoutes);



app.listen(port, () => {
    console.log("Server running at port", port);    
});