import "./Routing.css";
import {Route, Routes, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import ProductsView from "../../ProductsArea/ProductsView/ProductsView";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import BigShoppingList from "../../ShoppingListArea/BigShoppingList/BigShoppingList";
import Checkout from "../../ShoppingListArea/Checkout/Checkout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			
            <Routes>
                <Route path="/" element={<Navigate to={"/home"}/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/products/:type/:search" element={<ProductsView/>}></Route>
                <Route path="/finalList" element={<BigShoppingList/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
            
        </div>
    );
}

export default Routing;
