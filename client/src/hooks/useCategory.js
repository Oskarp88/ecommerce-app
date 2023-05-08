import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    //get cat
    //get all cat
    const getAllCategory = async () => {
        try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
        if(data?.success){
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(()=>{
        getAllCategory();
    },[]);
    
    return categories;
}