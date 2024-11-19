import e from "express";
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from "../models/Product.js";

const router = e.Router();

/**
 * Rotas de Usuário
 */

router.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find().lean();
        res.render('user/dashboard', {data: users});
    } catch (error) {
        console.log(error.message);
        
    }
})

// add novo usuário
router.get('/store', async (req, res) => {
    try {
        res.render('user/store');
    } catch (error) {
        console.log(error.message);
        
    }
});

router.post('/store', async (req, res) => {

    const errors = [];

    if( !req.body.name ||
    typeof req.body.name == undefined || 
    typeof req.body.name == null) {
            errors.push({ text: "Nome inválido"});
    }

    if(errors.length > 0) {
        res.render('user/store', {errors: errors});
    } else {

        try {
            const user = await User.create(req.body);
            res.redirect('/user/dashboard');
        } catch (error) {
            console.log(error.message);
            
        }

    }

});

// excluir usuário

router.get('/destroy/:id', async (req, res) => {
    try {        
        const user =  await User.findById(req.params.id).lean();
        res.render('user/destroy', {data: user});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/destroy/', async (req, res) => {
    try {        
        const user = await User.findByIdAndDelete(req.body.id).lean();
        console.log(user);
        
        res.redirect('/user/dashboard');
    } catch (error) {
        console.log(error.message);
    }
});

/**
 * Rotas de Categorias
 */

// dashboard das categorias
router.get('/category/dashboard/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const categories = await Category.find({user: userId}).lean();
        const user = await User.findById(userId).lean();
        
        res.render('category/dashboard', {data: {categories, user}});
    } catch (error) {
        console.log(error.message);
        
    }
});

// adicionar nova categoria
router.get('/category/store/:id', async (req, res) => {
    try {
        res.render('category/store' , {data: {
            id: req.params.id
        }});
    } catch (error) {
        console.log(error.message);
        
    }
});

router.post('/category/store', async (req, res) => {

    const errors = [];

    if( !req.body.name ||
    typeof req.body.name == undefined || 
    typeof req.body.name == null) {
        errors.push({ text: "Nome inválido"});
    }  

    if(errors.length > 0) {
        res.render('category/store', {data: {
            id: req.body.user,
            errors: errors 
        }});        
    } else {
        
        try {
            await Category.create(req.body);
            
            res.redirect('/user/dashboard');
        } catch (error) {
            console.log(error.message);
            
        }

    }
});

// atualizar categoria

router.get('/category/update/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.render('category/update' , {data: {id: req.params.id, category: category.name}});
    } catch (error) {
        console.log(error.message);
        
    }
});

router.post('/category/update', async (req, res) => {

    const category = await Category.findById(req.body.id).lean();

    const errors = [];

    if( !req.body.name ||
    typeof req.body.name == undefined || 
    typeof req.body.name == null) {
            errors.push({ text: "Nome inválido"});
    }

    if(errors.length > 0) {
        res.render('category/update', {data: {
            id: req.body.id,
            errors: errors,
            category: category.name
        }});        
    } else {
        
        try {
            const content = await Category.findByIdAndUpdate(req.body.id, req.body).exec();
            res.redirect('/user/dashboard');
            
            
        } catch (error) {
            console.log(error.message);
            
        }

    }

}); 

// excluir categoria

router.get('/category/destroy/:id', async (req, res) => {
    try {        
        const category = await Category.findById(req.params.id).lean();
        res.render('category/destroy', {data: category});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/category/destroy/', async (req, res) => {
    try {        
        const category = await Category.findByIdAndDelete(req.body.id).lean();
        console.log(category);
        
        res.redirect('/user/dashboard');
    } catch (error) {
        console.log(error.message);
    }
});

/**
 * Rotas de Produtos
 */

// dashboard de produtos

router.get('/product/dashboard/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        const products = await Product.find({category: req.params.id}).lean();
        
        res.render('product/dashboard', {data: {
            id: req.params.id,
            category,
            products
        }});
    } catch (error) {
        
    }
});

// armazenar novo produto

router.get('/product/store/:id', async (req, res) => {
    try {
        res.render('product/store', {data: {
            id: req.params.id,

        }});
    } catch (error) {
        console.log(error.message);
        
    }
});

router.post('/product/store', async (req, res) => {

    const errors = [];

    if( !req.body.name ||
    typeof req.body.name == undefined || 
    typeof req.body.name == null) {
            errors.push({ text: "Nome inválido"});
    }

    if(!req.body.price ||
        typeof req.body.price == undefined ||
        typeof req.body.price == null
    ) {
        errors.push({ text: "Valor inválido"});

    }

    
    

    if(errors.length > 0) {
        res.render('product/store', {data: {
            errors: errors,
            id: req.body.category
        }});        
    } else {

        try {
            // armazenar produto       
            await Product.create(req.body);
            
            // calcular total da categoria
            const productCategory = req.body.category;
            const category = await Category.findById(productCategory).exec();
            const products = await Product.find({category: productCategory}).exec();
    
            let totalPrice = 0;
    
            const productsPrices = products.map( p => p.price);
            productsPrices.forEach( p => totalPrice += p);
    
            category.total_price = totalPrice;
            await category.save();
    
            res.redirect('/user/dashboard');
        } catch (error) {
            console.log(error.message);
            
        }

    }

});

// atualizar produto

router.get('/product/update/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product/update' , {data: {id: req.params.id, name: product.name, price: product.price}});
    } catch (error) {
        console.log(error.message);
        
    }
});

router.post('/product/update', async (req, res) => {

    const product = await Product.findById(req.body.id).lean();

    console.log(product.category);
    

    const errors = [];

    if( !req.body.name ||
    typeof req.body.name == undefined || 
    typeof req.body.name == null) {
            errors.push({ text: "Nome inválido"});
    }

    if(!req.body.price ||
        typeof req.body.price == undefined ||
        typeof req.body.price == null
    ) {
        errors.push({ text: "Valor inválido"});

    }

    if(errors.length > 0) {
        res.render('product/update', {data: {
            id: req.body.id,
            errors: errors,
            product: product.name
        }});        
    } else {

        try {
            // atualizar roduto
            await Product.findByIdAndUpdate(req.body.id, req.body).exec();
            
            // atualizar valor da categoria
            const product = await Product.findById(req.body.id).exec();
            const productCategory = product.category;
            const category = await Category.findById(productCategory).exec();
            const products = await Product.find({category: productCategory}).exec();
            
            let totalPrice = 0;
            
            const productsPrices = products.map( p => p.price);
            productsPrices.forEach( p => totalPrice += p);
    
            category.total_price = totalPrice;
            await category.save();
    
            res.redirect('/user/dashboard');
           
            
            
        } catch (error) {
            console.log(error.message);
            
        }

    }

}); 

// excluir produto

router.get('/product/destroy/:id', async (req, res) => {
    try {        
        const product = await Product.findById(req.params.id).lean();
        res.render('product/destroy', {data: product});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/product/destroy/', async (req, res) => {
    try {       
        
        // atualizar valor total da categoria      
        
        const product = await Product.findById(req.body.id).lean();
        const productPrice = product.price;
        const productCategory = product.category;
        const category = await Category.findById(productCategory).exec();
        
        category.total_price -= productPrice;
        
        // excluir produto
        await Product.findByIdAndDelete(req.body.id).lean();
        await category.save();

        res.redirect('/user/dashboard');
    } catch (error) {
        console.log(error.message);
    }
});

export default router;