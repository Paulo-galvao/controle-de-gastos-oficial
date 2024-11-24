import e from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import 'dotenv/config';

import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';

const port = 3021;

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
app.use('/user/product', productRoutes);
app.use('/user/category', categoryRoutes);

app.listen(port, () => {
    console.log("Server running at port", port);    
});