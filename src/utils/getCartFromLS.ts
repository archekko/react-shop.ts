import { CartItem } from "../redux/slices/cartSlice";
import { calcTotalPriceAdd } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPriceAdd(items);

    return {
        items: items as CartItem[],
        totalPrice
    }
};