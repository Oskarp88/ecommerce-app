import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMidlewares.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//create
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
//update
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
//get all category
router.get('/get-categories', categoryController);
//single category
router.get('/sigle-category/:slug', singleCategoryController);
//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
