import e from "express";
import categoryController from "../controllers/category.controller.js";
const router = e.Router();

// dashboard
router.get('/dashboard/:id', categoryController.getDashboard);

// store
router.get('/store/:id', categoryController.getStore);
router.post('/store', categoryController.store);

//update
router.get('/update/:id', categoryController.getUpdate);
router.post('/update', categoryController.update);

// destroy
router.get('/destroy/:id', categoryController.getDestroy);
router.post('/destroy', categoryController.destroy);

export default router;