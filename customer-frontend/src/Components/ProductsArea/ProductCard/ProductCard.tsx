import { stringify } from "querystring";
import { useEffect, useState } from "react";
import ProductBoughtModel from "../../../Models/ProductBoughtModel";
import ProductModel from "../../../Models/ProductModel";
import { addProductsAction, fetchProductsAction, shoppingListsStore, updateProductsAction, deleteProductsAction } from "../../../Redux/ShoppingListState";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel;
}

// function ProductCard(props: {product: ProductModel, style: string}): JSX.Element {
function ProductCard(props: ProductCardProps): JSX.Element {

    // get the matched item from user's shopping list
    const item = shoppingListsStore.getState().items.find(item => item.code === props.product.code);
    // a local state for the amount of each item in user's shopping list 
    const [amount, setAmount] = useState<number>(0);
    
    
    // get the initial amount of items from the product in the shopping list,
    // and set a local state so it can appear in the input form
    useEffect(() => {

        if (item) {
            setAmount(item.amount);
            console.log("from set amount");
        }
    },[]);


    // const setProductAmount = () => {
        
    //     let inputAmount = document.getElementById("amount-" + props.product.code) as any;
    //     let amount = inputAmount.value;
    //     changeShoppingList(amount);
    // }




    // add product to the user's shopping list

    function changeShoppingList(amount: number) {


        // get the shopping list items
        let items = shoppingListsStore.getState().items;
    
    
        // get the product
        let product = props.product;
        
        
        // create a new item in shopping list
        if ((amount > 0) && !(items.find(item => item.code === props.product.code))) {
            console.log("added =========")
            const newItem = new ProductBoughtModel();
            newItem.code = product.code;
            newItem.amount = amount;
            newItem.name = product.name;
            newItem.price = product.price;
            newItem.totalPrice = newItem.price * newItem.amount;
            shoppingListsStore.dispatch(addProductsAction(newItem));
            
            
        // change amount
        } else if ((amount > 0) && (items.find(item => item.code === product.code))) {
            console.log("changed =========")
            const changedItem = items.find(item => item.code === product.code);
            changedItem.amount = amount;
            changedItem.price = product.price;
            changedItem.totalPrice = changedItem.price * changedItem.amount;
            shoppingListsStore.dispatch(updateProductsAction(changedItem));
            

        // delete item from shopping list
        } else if (amount <= 0) {
            console.log("deleted =========")
            if (items.find(item => item.code === props.product.code)) {
                shoppingListsStore.dispatch(deleteProductsAction(product.code))
            }


        }
    }


    // when user changes the amount of items in the shopping list:
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        // get the new amount
        let amount = (e.currentTarget as any).value;
        // change the local state (so the value in the input will update)
        setAmount(amount);
        // add the change to user's shopping list
        changeShoppingList(amount);
    }





    return (
        <div className="ProductCard">

            <img src="" alt="" />

            <div id="prodDetails">
                <div>
                    <span className="tags code">קוד מוצר:</span>
                    <span className="details code">{props.product.code}</span>
                </div>
                <div>
                    <span className="tags">שם:</span>
                    <span className="details">{props.product.name}</span>
                </div>
                <div>
                    <span className="tags">מחיר:</span>
                    <span className="details">₪{props.product.price}</span>
                </div>
                <div>
                    <span className="tags">קטגוריה:</span>
                    <span className="details">{props.product.category}</span>
                </div>
                <div>
                    <span className="tags">יצרן:</span>
                    <span className="details">{props.product.company}</span>
                </div>
            </div>

            <div id="buttons">
                <button>✖️</button>
                <input
                    id={"amount-" + props.product.code}
                    type="number"
                    value={amount}
                    onChange = {(e) => {handleChange(e)}}/>
                <button>➖</button>
            </div>

			
        </div>
    );
}

export default ProductCard;
