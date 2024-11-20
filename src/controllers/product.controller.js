import Category from "../models/Category.js";
import Product from "../models/Product.js";

async function getDashboard(req, res) {
    try {
        const category = await Category.findById(req.params.id).lean();
        const products = await Product.find({category: req.params.id}).lean();
        
        res.render('product/dashboard', {data: {
            id: req.params.id,
            category,
            products
        }});
    } catch (error) {
        console.log(error.message);
            
    }
}

async function getStore(req, res) {
    try {
        res.render('product/store', {data: {
            id: req.params.id,

        }});
    } catch (error) {
        console.log(error.message);
        
    }
}

async function store(req, res) {
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
}

async function getUpdate(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product/update' , {data: {id: req.params.id, name: product.name, price: product.price}});
    } catch (error) {
        console.log(error.message);
        
    }
}

async function update(req, res) {
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
}

async function getDestroy(req, res) {
    try {        
        const product = await Product.findById(req.params.id).lean();
        res.render('product/destroy', {data: product});
    } catch (error) {
        console.log(error.message);
    }
}

async function destroy(req, res) {
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
}

export default {
    getDashboard,
    getStore,
    store,
    getUpdate,
    update,
    getDestroy,
    destroy
}