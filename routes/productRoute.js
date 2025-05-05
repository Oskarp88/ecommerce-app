import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMidlewares.js";
import { 
    braintreePaymentController,
    braintreeTokenController,
    createProductController, 
    deleteProductController, 
    featuredProductsController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productFilterController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductController 
} from "../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);
router.post('/product-filters', productFilterController);
router.get('/product-count', productCountController);
router.get('/product-list/:page', productListController);
router.get('/search/:keyword', searchProductController);
router.get('/related-product/:pid/:cid', relatedProductController);
//category wise product
router.get('/product-category/:slug', productCategoryController);
//payments routes
//token
router.get('/braintree/token', braintreeTokenController);
//payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);
// obtener productos destacados
router.get('/featured-products', featuredProductsController);

export default router;