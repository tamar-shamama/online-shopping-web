import { createStore } from "redux";
import ProductBoughtModel from "../Models/ProductBoughtModel";

// a state of current shoppinglist the customer is creating. when the dill is
// done; the state will be deleted.



export class ShoppingListState {

    public items: ProductBoughtModel[] = [];

    public constructor() {

        const list = JSON.parse(localStorage.getItem("shoppingListItems"));

        if (list !== null) {
            this.items = list;
        }
    }
}




export enum ItemsActionType {
    FetchProducts,
    AddProduct,
    DeleteProduct,
    UpdateProduct,
    clear
}


export interface ItemAction {
    type: ItemsActionType;
    payload?: any;
}




// fetch
export function fetchProductsAction(products:ProductBoughtModel[]):ItemAction {
    return {type: ItemsActionType.FetchProducts, payload:products};
}
// add
export function addProductsAction(product:ProductBoughtModel):ItemAction {
    return {type: ItemsActionType.AddProduct, payload:product};
}

// update
export function updateProductsAction(product:ProductBoughtModel):ItemAction {
    return {type: ItemsActionType.UpdateProduct, payload:product};
}

// delete
export function deleteProductsAction(id: number):ItemAction {
    return {type: ItemsActionType.DeleteProduct, payload:id};
}

// check out
export function clearAction():ItemAction {
    return {type: ItemsActionType.clear};
}



export function productReducer(currentState = new ShoppingListState(), action: ItemAction): ShoppingListState {

    const newState = {...currentState};

    console.log("from reducer");
    
    switch(action.type) {

        case ItemsActionType.FetchProducts:
            newState.items = action.payload;
            break;

        case ItemsActionType.AddProduct:  // payload is product

            newState.items.push(action.payload); // add item to store
            localStorage.setItem("shoppingListItems", JSON.stringify(newState.items)); // add item to storage
            break;

        
        case ItemsActionType.DeleteProduct: // payload is product id

            const indexToDelete = newState.items.findIndex(i => i.code === action.payload); // get the index of the item
            if(indexToDelete >=0) {
                 newState.items.splice(indexToDelete, 1);                         // delete product from the list
                 localStorage.setItem("shoppingListItems", JSON.stringify(newState.items));  // save in storage
            }
            break;
        

        case ItemsActionType.UpdateProduct: // payload is the product

            const indexToUpdate = newState.items.findIndex(item => item.code === action.payload.code);
            if (indexToUpdate >=0) {
                newState.items[indexToUpdate] = action.payload;                  // change product in the list
                localStorage.setItem("shoppingListItems", JSON.stringify(newState.items));  // save in storage
            } 
            break;
            
            
            case ItemsActionType.clear:
                newState.items = [];
                localStorage.setItem("shoppingListItems", JSON.stringify(newState.items));
                break;

    }
    return newState;
}



export const shoppingListsStore = createStore(productReducer);
