import User from '../models/User.js';

async function getDashboard(req, res) {
    try {
        const users = await User.find().lean();
        res.render('user/dashboard', {data: users});
    } catch (error) {
        console.log(error.message);
        
    }
}

async function getStore(req, res) {
    try {
        res.render('user/store');
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
        res.render('user/store', {errors: errors});
    } else {

        try {
            const user = await User.create(req.body);
            res.redirect('/user/dashboard');
        } catch (error) {
            console.log(error.message);
            
        }

    }
}

async function getDestroy(req, res) {
    try {        
        const user =  await User.findById(req.params.id).lean();
        res.render('user/destroy', {data: user});
    } catch (error) {
        console.log(error.message);
    }
}

async function destroy(req, res) {
    try {        
        const user = await User.findByIdAndDelete(req.body.id).lean();
        
        res.redirect('/user/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    getDashboard,
    getStore,
    store,
    getDestroy,
    destroy
}