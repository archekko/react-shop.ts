import  {CartItem}  from "../redux/slices/cartSlice";

export const calcTotalPriceAdd = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

export const calcTotalPriceASC = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count - sum, 0);
};