import e from "express";
import productController from "../controllers/product.controller.js";

const router = e.Router();

// dashboard
router.get('/dashboard/:id', productController.getDashboard);

// store
router.get('/store/:id', productController.getStore);
router.post('/store', productController.store);

// update
router.get('/update/:id', productController.getUpdate);
router.post('/update', productController.update);

// destroy
router.get('/destroy/:id', productController.getDestroy);
router.post('/destroy', productController.destroy);

export default router;