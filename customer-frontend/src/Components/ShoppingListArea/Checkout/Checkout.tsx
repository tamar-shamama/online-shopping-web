import { shoppingListsStore } from "../../../Redux/ShoppingListState";
import "./Checkout.css";
import ProductBoughtModel from "../../../Models/ProductBoughtModel";
import { useEffect, useState } from "react";


function Checkout(): JSX.Element {

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
        <div className="Checkout">
			<h2>
                <span>מחיר לתשלום: </span>
                <span>₪{total}</span>
            </h2>

            <form action="">
                <input type="text" placeholder="שם פרטי"/>
                <input type="number" placeholder="מספר כרטיס"/>
                <br />
                <input type="text" placeholder="שם משפחה"/>
                <span>תוקף כרטיס </span>
                <input type="date"/>
                <br />
                <input type="number" placeholder="תעודת זהות"/>
                <input type="number" placeholder="ccv"/>
                <br />
                <input type="tel" pattern="05[0-9]{1}-[0-9]" placeholder="מספר טלפון"/>
                <br />
                <input type="email" placeholder="דואר אלקטרוני"/>
                <br />
                <br />
                <br />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Checkout;
