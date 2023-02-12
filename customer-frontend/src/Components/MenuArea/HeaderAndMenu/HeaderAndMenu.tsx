import "./HeaderAndMenu.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SmallShoppingList from "../../ShoppingListArea/SmallShoppingList/SmallShoppingList";
import productsService from "../../../Service/ProductsService";


function HeaderAndMenu(): JSX.Element {

    const navigate = useNavigate();
    const [categories, setCategories] = useState<string[]>([]);
    const [companies, setCompanies] = useState<string[]>([]);


    useEffect(()=>{

        (async() => {

            const categories = await productsService.getAllCategories();
            setCategories(categories);

            const companies = await productsService.getAllCompanies();
            setCompanies(companies);
        })();

    },[]);




    // open and close customer's shopping list
    const [on, setOn] = useState<boolean>(false);

    function showList() {
        if (on) {
            setOn(false);
        } else {
            setOn(true);
        }
    }


    // create a dropdown menu for category and company

    const [clickCat, setClickCat] = useState<boolean>(false);
    const [clickComp, setClickComp] = useState<boolean>(false);

    // display the fitting dropdown menu when clicked
    function drop(type:String): void {

        switch (type) {

            case "cat":

                if (!clickCat) {
                    setClickCat(true);
                } else {
                    setClickCat(false);
                }
                setClickComp(false);
                break;
                

            case "comp":

                if (!clickComp) {
                    setClickComp(true);
                } else {
                    setClickComp(false);
                }
                setClickCat(false);
                break;
        }
    }


    

    // create free search on searchbar
    function searchByUserInput() {
        const userWord = document.getElementById("searchWord") as any;
        navigate("/products/word/" + userWord.value);
    }




    
    return (
        <div className="HeaderAndMenu">

            <header>סופר יקיר - הכי יקר בעיר</header>

            <div id="menu">

                <NavLink to={"/home"} className="menu-options">עמוד הבית</NavLink>
                
                <button className="dropdown menu-options" onClick={() => drop("cat")}>קטגוריה</button>
                
                <button className="dropdown menu-options" onClick={() => drop("comp")}>יצרן</button>
                
                <button className="dropdown menu-options">אחרונים</button>
                
                <div className="menu-options">
                    <input type="text" placeholder="חיפוש" id="searchWord" />
                    <input type="submit" onClick={searchByUserInput} />
                </div>

                <NavLink to={"/products/all/all"} id="all">לרשימת המוצרים המלאה</NavLink>
            </div>



            {clickCat &&
                 <>
                    <div className="dropdown-options" id="drop-cat">
                        {categories.map(cat => (<NavLink to={"/products/cat/" + cat}>{cat}</NavLink>))}
                    </div>
                 </>
            }

            {clickComp &&
                 <>
                    <div className="dropdown-options" id="drop-comp">
                        {companies.map(comp => (<NavLink to={"/products/comp/" + comp}>{comp}</NavLink>))}
                    </div>
                 </>
            }


        <button id="sList" title="ראו רשימת קניות" onClick={showList}>🛒</button>

        {on && (
            <SmallShoppingList/>
        )}

			
        </div>
    );
}

export default HeaderAndMenu;
