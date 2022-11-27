import { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderAndMenu from "../../MenuArea/HeaderAndMenu/HeaderAndMenu";
import SmallShoppingList from "../../ShoppingListArea/SmallShoppingList/SmallShoppingList";
import Commercial from "../Commercial/Commercial";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {


    return (
        <div className="Layout">

            {/* <Commercial/> */}
            <HeaderAndMenu/>
            <Routing/>
            <footer>All Right Reserved</footer>

			
        </div>
    );
}

export default Layout;
