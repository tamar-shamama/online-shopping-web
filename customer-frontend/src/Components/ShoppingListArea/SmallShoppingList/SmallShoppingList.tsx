import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductBoughtModel from "../../../Models/ProductBoughtModel";
import { clearAction, shoppingListsStore } from "../../../Redux/ShoppingListState";
import "./SmallShoppingList.css";

function SmallShoppingList(): JSX.Element {

    const [items, setItems] = useState<ProductBoughtModel[]>(shoppingListsStore.getState().items);
    const [total, setTotal] = useState<number>(0);

    const navigate = useNavigate();
    

    // set the local state with items in ShoppingList with each change
    useEffect(() => {

        const unsubscribe = shoppingListsStore.subscribe(() => {
            let list = [...shoppingListsStore.getState().items];
            setItems(list);
        });

        return () => {
            unsubscribe();
        }
        
    },[]);


    // recalculate total price when list is changed
    useEffect(() => {
        let a = 0;
    
        items.forEach(item => {
            a += item.totalPrice
        });
        setTotal(Number(a.toFixed(2)));

    },[items]);







    return (
        <div className="SmallShoppingList">

            <h3>רשימת קניות</h3>

                {items.map((item) =>(

                    
                    <div className="item" key={item.code}>

                        <div id="name">
                            <span>{item.name}</span>
                        </div>

                        <div>
                            <span className="pratim">כמות: </span>
                            <span>{item.amount}</span>
                        </div>


                        <div>
                            <span className="pratim">סה"כ: </span>
                            <span>{Number(item.totalPrice).toFixed(2)}</span>
                        </div>

                    </div>

                ))}


            <br />
            <h4>
                <span>מחיר סופי: </span>
                <span>{total}</span>
            </h4>

            <div id="kaftorim">

                <button id="siyum" onClick={() => {navigate("/finalList")}}>סיום</button>

                <button id="nikuy" onClick={() => {
                    const ok = window.confirm("רשימת הקניות תימחק. להמשיך ❓");
                    if (ok) {
                        shoppingListsStore.dispatch(clearAction())}
                    }
                    }>ניקוי</button>
            </div>
        </div>
    );
}

export default SmallShoppingList;
