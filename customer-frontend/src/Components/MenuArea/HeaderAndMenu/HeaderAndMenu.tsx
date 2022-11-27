import "./HeaderAndMenu.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SmallShoppingList from "../../ShoppingListArea/SmallShoppingList/SmallShoppingList";


function HeaderAndMenu(): JSX.Element {


    // open and close shopping list
    const [on, setOn] = useState<boolean>(false);

    function showList() {
        if (on) {
            setOn(false);
        } else {
            setOn(true);
        }
    }


    // create a dropdown menu

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


    const [categories] = useState<string[]>(["aaa", "bbb", "ccc", "ddd"]);
    const [companies] = useState<string[]>(["ee", "ffffff", "gggg", "hhhhhhh"]);




    
    return (
        <div className="HeaderAndMenu">

            <header>סופר דקר - הכי יקר בכפר</header>

            <div id="menu">
                <NavLink to={"/home"} className="menu-options">עמוד הבית</NavLink>
                <button className="dropdown menu-options" onClick={() => drop("cat")}>קטגוריה</button>
                <button className="dropdown menu-options" onClick={() => drop("comp")}>יצרן</button>
                <button className="dropdown menu-options">אחרונים</button>
                <div className="menu-options">
                    <input type="text" placeholder="חיפוש" />
                    <input type="submit" />
                </div>
            </div>



            {clickCat &&
                 <>
                    <div className="dropdown-options" id="drop-cat">
                        <NavLink to={"/products/cat/" + categories[0]}>{categories[0]}</NavLink>
                        <NavLink to={"/products/cat/" + categories[1]}>{categories[1]}</NavLink>
                        <NavLink to={"/products/cat/" + categories[2]}>{categories[2]}</NavLink>
                        <NavLink to={"/products/cat/" + categories[3]}>{categories[3]}</NavLink>
                    </div>
                 </>
            }

            {clickComp &&
                 <>
                    <div className="dropdown-options" id="drop-comp">
                        <NavLink to={"/products/comp/" + companies[0]}>{companies[0]}</NavLink>
                        <NavLink to={"/products/comp/" + companies[1]}>{companies[1]}</NavLink>
                        <NavLink to={"/products/comp/" + companies[2]}>{companies[2]}</NavLink>
                        <NavLink to={"/products/comp/" + companies[3]}>{companies[3]}</NavLink>
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
