import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../Redux/ProductsState";
import productsService from "../../../Service/ProductsService";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

function ProductsList(props: {typeSearch: string, searchWord: string}): JSX.Element {


    
    const [products, setProducts] = useState<ProductModel[]>([]);


    // set the list of products
    useEffect(()=> {


        (async () => {

            switch (props.typeSearch) {

                // products by category
                case ("cat"):

                    try {
                        const products = await productsService.getProductsByCat(props.searchWord);
                        setProducts(products);
                    } catch (error: any) {
                            alert (error.message + " :(");
                    }
                    break;
                        
                        
                // products by company     
                case ("comp"):
                            
                    try {
                        const products = await productsService.getProductsByComp(props.searchWord);
                        setProducts(products);
                    } catch (error: any) {
                        alert (error.message + " :(");
                    }
                    break;
                            
                
                // products by search word
                case ("word"):
                                
                    try {
                        const products = await productsService.getProductsBySearchWord(props.searchWord);
                        setProducts(products);
                    } catch (error: any) {
                            alert (error.message + " :(");
                    }
                    break;
                    

                 // all products   
                default:

                    try {
                        const products = await productsService.getAllProducts();
                        setProducts(products);
                    } catch (error: any) {
                            alert (error.message + " :(");
                    }
                    break;

            }

        })();



    },[props.searchWord]);

    
    // useEffect(() => {
    //     const unsubscribe = productsStore.subscribe(()=>{
        //         console.log("=========");
    //         console.log(products);
    //     })
    // },[]);


    // set the list of products
    



    // set alternating background color
    function setBC (index: number): string {
        if (index%2 === 0) {
            return"rgba(86, 86, 240, 0.165)";
        } else {
            return "white";
        }
    }



    return (
        <div className="ProductsList">

           {products.map((prod, index) => (

               <div key={prod.code} style={{backgroundColor: setBC(index)}}>
                   <ProductCard product={prod}/>
               </div>

            ))}
           
        </div>
    );
}

export default ProductsList;
