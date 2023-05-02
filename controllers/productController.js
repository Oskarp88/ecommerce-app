import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async(req, res) => {
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

export const updateProductController = async(req, res) => {
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

export const getProductController = async(req, res) => {
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

export const getSingleProductController = async(req,res) => {
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

export const productPhotoController = async(req, res) => {
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

export const deleteProductController = async(req,res) => {
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