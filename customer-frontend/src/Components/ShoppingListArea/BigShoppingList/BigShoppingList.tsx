import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductBoughtModel from "../../../Models/ProductBoughtModel";
import { shoppingListsStore } from "../../../Redux/ShoppingListState";
import "./BigShoppingList.css";

function BigShoppingList(): JSX.Element {


    // const [items] = useState<ProductBoughtModel[]>(shoppingListsStore.getState().items);
    const items : ProductBoughtModel[] = (shoppingListsStore.getState().items);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let a = 0;
        items.forEach(item => {
            a += item.totalPrice
        });
        setTotal(Number(a.toFixed(2)));

    },[]);


    return (
        <div className="BigShoppingList">

            <div id="koteret">
                <span>קוד מוצר</span>
                <span className="shem">שם</span>
                <span>מחיר ליחידה</span>
                <span>כמות</span>
                <span>סך הכל</span>
            </div>

            <br />
            <br />

			{items.map((item) => (

                <div id="mutzar">
                    <span>{item.code}</span>
                    <span className="shem">{item.name}</span>
                    <span>{item.price}</span>
                    <span>{item.amount}</span>
                    <span>{Number(item.totalPrice.toFixed(2))}</span>
                </div>
            ))}

            <br />
            <br />

            <div id="tashlum">
                <span>מחיר סופי לתשלום:</span>
                <span>₪{total}</span>
            </div>

            <br />
            <br />
            <br />

            <div id="links">
                <NavLink to={"/checkout"}>לדף התשלומים</NavLink>
                <NavLink to={"/home"} title="רשימת הקניות לא תימחק בלחיצה על הקישור">חזרה לדף הבית</NavLink>
            </div>

        </div>
    );
}

export default BigShoppingList;
