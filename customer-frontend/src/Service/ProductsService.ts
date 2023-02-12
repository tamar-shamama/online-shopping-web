import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { productsStore } from "../Redux/ProductsState";
import appConfig from "../Utils/Config";

class ProducstService {


    // get all of the products from the global state or from
    // server if state is empty
    public async getAllProducts(): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {

            const response = await axios.get<ProductModel[]>(appConfig.customerUrl + "get/all");
            const products = response.data;
            return products;
            
        }
        return productsStore.getState().products;
    }
    
    
    // get products by category from the global state or from
    // server if state is empty
    public async getProductsByCat(category: string): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {
            
            const response = await axios.get<ProductModel[]>(appConfig.customerUrl + "get/cat/" + category);
            const products = response.data;
            return products;
            
        } else {
            
            const allProd = productsStore.getState().products;
            const catProd: ProductModel[] = [];
            
            allProd.forEach(element => {
                if (element.category === category) {
                    catProd.push(element);
                }
            });
            
            return catProd;
        }
    }
    
    
    // get products by company from the global state or from
    // server if state is empty
    public async getProductsByComp(company: string): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {
            
            const response = await axios.get<ProductModel[]>(appConfig.customerUrl + "get/comp/" + company);
            const products = response.data;
            return products;

        } else {
            
            const allProd = productsStore.getState().products;
            const compProd: ProductModel[] = [];
            
            allProd.forEach(element => {
                if (element.company === company) {
                    compProd.push(element);
                }
            });
            
            return compProd;
        }
    }
    
    
    
    // get products by search word from the global state or from
    // server if state is empty
    public async getProductsBySearchWord(word: string): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {
    
            console.log(appConfig.customerUrl + "get/searchWord/" + word);
            const response = await axios.get<ProductModel[]>(appConfig.customerUrl + "get/searchWord/" + word);
            const products = response.data;
            return products;

        } else {

            const allProd = productsStore.getState().products;
            const wordProd: ProductModel[] = [];

            allProd.forEach(product => {

                let a = product.tags;

                a.forEach(tag => {
                    if (tag === word) {
                        wordProd.push(product);
                    }
                });
            });
            return wordProd;
        }
    }


    public async getAllCategories(): Promise<string[]> {

        const response = await axios.get<string[]>(appConfig.customerUrl + "categories");
        const categories = response.data;
        return categories;
    }


    public async getAllCompanies(): Promise<string[]> {

        const response = await axios.get<string[]>(appConfig.customerUrl + "companies");
        const companies = response.data;
        return companies;
    }


}

const productsService = new ProducstService();
export default productsService;