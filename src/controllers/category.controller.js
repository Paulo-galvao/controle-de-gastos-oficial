import Category from '../models/Category.js';
import User from '../models/User.js';

async function getDashboard(req, res) {
    try {
        const userId = req.params.id;
        const categories = await Category.find({user: userId}).lean();
        const user = await User.findById(userId).lean();
        
        res.render('category/dashboard', {data: {categories, user}});
    } catch (error) {
        console.log(error.message);
        
    }
}

async function getStore(req, res) {
    try {
        res.render('category/store' , {data: {
            id: req.params.id
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
}

async function getUpdate(req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.render('category/update' , {data: {id: req.params.id, category: category.name}});
    } catch (error) {
        console.log(error.message);
        
    }
}

async function update(req ,res) {
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
            await Category.findByIdAndUpdate(req.body.id, req.body).exec();
            res.redirect('/user/dashboard');
            
            
        } catch (error) {
            console.log(error.message);
            
        }

    }
}

async function getDestroy(req, res) {
    try {        
        const category = await Category.findById(req.params.id).lean();
        res.render('category/destroy', {data: category});
    } catch (error) {
        console.log(error.message);
    }
}

async function destroy(req, res) {
    try {        
        const category = await Category.findByIdAndDelete(req.body.id).lean();
        console.log(category);
        
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