import ProductModel from "../Models/ProductModel";
import { productsStore } from "../Redux/ProductsState";

class ProducstService {


    // get all of the products from the global state or from
    // server if state is empty
    public async getAllProducts(): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {
            
            // ...
        }
        return productsStore.getState().products;
    }
    
    
    // get products by category from the global state or from
    // server if state is empty
    public async getProductsByCat(category: string): Promise<ProductModel[]> {
        
        if (productsStore.getState().products.length === 0) {
            
            // ...
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
            
            // ...
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
    
            // ...
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


}

const productsService = new ProducstService();
export default productsService;