import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"
import orderModel from '../models/orderModel.js';
import fs from 'fs';
import braintree from "braintree";
import dontenv from 'dotenv';

dontenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  

//payment gateway api
// token
exports.braintreeTokenController = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(err,response){
            if(err){
                res.status(500).send(err);
            }else{
                res.send(response);
            }
        })
    } catch (error) {
       console.log(error);
    }
}

//payment 
exports.braintreePaymentController = async(req, res) =>{
    try {
        const {cart, nonce} = req.body;
        let total = 0;
        cart?.map(i => {total += i.price});
        let newTransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement: true
            }
        },
        function(error, result){
          if(result){
            const order = new orderModel({
                products: cart,
                payment: result,
                buyer: req.user._id
            }).save()
            res.json({ok:true})
          }else{
            res.status(500).send(error)
          }
        }
        )
    } catch (error) {
        console.log(error);
    }
}

exports.createProductController = async(req, res) => {
   try {
       const {name,slug,description,price,category,quantify,shipping} = req.fields;
       const {photo} = req.files;

       switch(true){
         case !name:
            return res.status(500).send({error: 'Name is Required'})
        case !description:
            return res.status(500).send({error: 'Description is Required'})
        case !price:
            return res.status(500).send({error: 'Price is Required'})
        case !category:
            return res.status(500).send({error: 'Category is Required'})
        case !quantify:
            return res.status(500).send({error: 'Quantify is Required'})
        case photo && photo.size > 1000000:
            return res.status(500).send({error: 'Shipping is Required and should be less then 1mb'})
        }
       const products = new productModel({...req.fields, slug:slugify(name)})
       if(photo){
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
       }
       await products.save();
       res.status(201).send({
        success:true,
        message:'Product Created Successfully',
        products
       })
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success:false,
        error,
        message:'Error in creating product'
       })
   }
}

exports.updateProductController = async(req, res) => {
    try {
        const {name,slug,description,price,category,quantify,shipping} = req.fields;
        const {photo} = req.files;
 
        switch(true){
          case !name:
             return res.status(500).send({error: 'Name is Required'})
         case !description:
             return res.status(500).send({error: 'Description is Required'})
         case !price:
             return res.status(500).send({error: 'Price is Required'})
         case !category:
             return res.status(500).send({error: 'Category is Required'})
         case !quantify:
             return res.status(500).send({error: 'Quantify is Required'})
         case photo && photo.size > 1000000:
             return res.status(500).send({error: 'Shipping is Required and should be less then 1mb'})
         }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields, 
            slug: slugify(name)
        },
        {
            new: true
        });

        if(photo){
           products.photo.data = fs.readFileSync(photo.path);
           products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
         success:true,
         message:'Product updated Successfully',
         products
        })
     } catch (error) {
        console.log(error);
        res.status(500).send({
         success:false,
         error,
         message:'Error in update product'
        })
    }
}

exports.getProductController = async(req, res) => {
    try {
        const product = await productModel
           .find({})
           .populate('category')
           .select('-photo')
           .limit(12)
           .sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            counTotal: product.length,
            message: 'ALLproducts',
            product
        })
    } catch (error) {
        console.log(error);
       res.status(500).send({
        success:false,
        error,
        message:'Error getting product'
       })
    }
}

exports.getSingleProductController = async(req,res) => {
    try {
        const product = await productModel
        .findOne({slug:req.params.slug})
        .select('-photo')
        .populate('category');
        res.status(201).send({
            success: true,
            message: 'Single Product Fetched',
            product
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while getling single product',
            error
        })
    }
}

exports.productPhotoController = async(req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while getting photo',
            error
        })
    }
}

exports.deleteProductController = async(req,res) => {
    const { pid } = req.params;
    try {
        await productModel.findByIdAndDelete(pid).select('-photo');
        res.status(200).send({
            success:true,
            message:'Product Delete successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error while deleting product',
            error
        })
    }
}

exports.productFilterController = async (req, res) => {
   try {
       const {checked, radio} = req.body;
       let args = {} 
       if(checked.length > 0) args.category = checked;
       if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
       const products = await productModel.find(args);
       res.status(200).send({
        success:true,
        products
       })
   } catch (error) {
      console.log(error);
      res.status(400).send({
        success:false,
        message: 'Error While Filtering Products'
      })
   }
}

exports.productCountController = async(req, res) => {
   try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
   } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message: 'Error in product count',
            error
        });
   }
}

//product list base on page
exports.productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.query.page ? parseInt(req.query.page) : 1;
  
      const products = await productModel.find({})
        .select('-photo')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
  
      const totalProducts = await productModel.countDocuments();
  
      res.status(200).send({
        success: true,
        products,
        totalProducts
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: 'Error in infinite scroll',
        error
      });
    }
  }
  

exports.searchProductController = async(req, res) => {
   try {
    const {keyword} = req.params;
    const result = await productModel.find({
        $or: [
           {name:{$regex: keyword, $options:'i'}},
           {description:{$regex: keyword, $options:'i'}} 
        ]
    }).select('-photo');
    res.json(result);
   } catch (error) {
    console.log(error);
    res.status(400).send({
        success:false,
        message: 'Error in Search Product API',
        error
    });
   }
}

exports.relatedProductController = async(req,res) => {
    try {
        const {pid, cid} = req.params;
        const products = await productModel.find({
            category: cid,
            _id:{$ne:pid}
        }).select('-photo').limit(3).populate('category');
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message: 'Error while getting related product',
            error
        });
    }
}

//get product by category
exports.productCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success:true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message: 'Error while getting product',
            error
        });
    }
}

exports.featuredProductsController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.query.page ? parseInt(req.query.page) : 1;
  
      const products = await productModel.find({ featured: true })
        .select('-photo')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
  
      const totalProducts = await productModel.countDocuments({ featured: true });
  
      res.status(200).send({
        success: true,
        products,
        totalProducts
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: 'Error while getting featured products',
        error
      });
    }
  };
  
  