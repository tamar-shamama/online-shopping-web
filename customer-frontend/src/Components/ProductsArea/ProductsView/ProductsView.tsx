import "./ProductsView.css";
import {useParams } from "react-router-dom";
import ProductsList from "../ProductsList/ProductsList";
import { useEffect } from "react";
import { productsStore } from "../../../Redux/ProductsState";

function ProductsView(): JSX.Element {

    const param = useParams();
    const type = param.type;
    const search = param.search;
    


    return (
        <div className="ProductsView">
	
            <h2>
                <span>רשימת המוצרים </span>

                {param.type === "cat" &&
                    <>
                        <span>לפי קטגוריה: </span>
                        <span>{param.search}</span>
                    </> 
                }


                {param.type === "comp" &&
                    <>
                        <span>לפי חברה: </span>
                        <span>{param.search}</span>
                    </> 
                }

                {param.type === "searchWord" &&
                    <>
                        <span>לפי מילת חיפוש: </span>
                        <span>{param.search}</span>
                    </> 
                }

            </h2>


            <ProductsList typeSearch={type} searchWord={search}/>


         </div>
    );
}

export default ProductsView;
