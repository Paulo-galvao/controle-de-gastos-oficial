import e from "express";
import userController from "../controllers/user.controller.js";

const router = e.Router();

// dashboard
router.get('/dashboard', userController.getDashboard);

// store
router.get('/store', userController.getStore);
router.post('/store', userController.store);

// destroy
router.get('/destroy/:id', userController.getDestroy);
router.post('/destroy/', userController.destroy);

export default router;