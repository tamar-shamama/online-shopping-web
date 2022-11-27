import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// a store in local storage for the products


const p1 = new ProductModel();
p1.category = "אאא";
p1.code = 1;
p1.company = "ee";
p1.name = "דגי גומי";
p1.price = 50;
p1.tags = ["דגים", "ממתקים"]

const p2 = new ProductModel();
p2.category = "בבבבב";
p2.code = 33;
p2.company = "ee";
p2.name = "טונה בשמן";
p2.price = 99.99;
p2.tags = ["דגים"];

const p3 = new ProductModel();
p3.category = "aaa";
p3.code = 7;
p3.company = "ee";
p3.name = "גגג גג";
p3.price = 2;

const p4 = new ProductModel();
p4.category = "aaa";
p4.code = 459;
p4.company = "דדדד";
p4.name = "דדדד";
p4.price = 1024;

const p5 = new ProductModel();
p5.category = "aaa";
p5.code = 101;
p5.company = "דדדד";
p5.name = "מוצר עם שם מאוד מאוד ארוך";
p5.price = 1024;

const p = [p1, p2, p3, p4, p5];


// a list of all products
export class ProductState {
    public products: ProductModel[] = p;
}

export enum ProductsActionType {
    FetchProducts,
}


export interface ProductAction {
    type: ProductsActionType;
    payload: any;
}




// fetch
export function fetchProductsAction(products:ProductModel[]):ProductAction {
    return {type: ProductsActionType.FetchProducts, payload:products};
}



export function productReducer(currentState = new ProductState(), action: ProductAction): ProductState {
    const newState = {...currentState};
    
    switch(action.type) {

        case ProductsActionType.FetchProducts:
            newState.products = action.payload;
            break;
    }
    return newState;
}



export const productsStore = createStore(productReducer);
