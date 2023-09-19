

import {Request, Response} from 'express';
import {SHOPPING_CART} from "./db-data";
import {ShoppingCart} from "./cart.model";


export function getUserCart(req: Request, res: Response) {

    const userId = Number(req.params["userId"]);
    console.log(userId);

    const cart =  SHOPPING_CART;

    const userCart = cart.filter((item) => item.UserID === userId);

    res.status(200).json(userCart);


}


