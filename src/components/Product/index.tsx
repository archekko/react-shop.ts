import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addItems } from "../../redux/slices/cartSlice";
import { selectCartItemsByID } from "../../redux/slices/cartSlice";
import { Product } from "../../redux/slices/productsSlice";
import { Link } from "react-router-dom";


type ItemProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

const typesNames = ["тонкое", "традиционное"];
const sizesNames = [26, 30, 40];

const ProductPizza: React.FC<ItemProps> = ({id, imageUrl, title, price, sizes, types }) => {
  const dispatch = useDispatch();
  
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(0);
  const cartItems = useSelector(selectCartItemsByID(id));

  const addedCount = cartItems ? cartItems.count : 0;

  const onClickAddPizza = (event: React.MouseEvent<HTMLButtonElement>) => {
    const item: Product = { 
      id,
      imageUrl,
      title,
      price,
      sizes: sizesNames[activeSize],
      types: typesNames[activeType],
      count: 0
    }
    dispatch(addItems(item));
  };


  return (
    <div className="pizza-block">
      <Link to={`/product/${id}`}>
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeIndex) => (
            <li
              key={typeIndex}
              className={activeType === typeIndex ? "active" : ""}
              onClick={() => setActiveType(typeIndex)}
            >
              {typesNames[typeIndex]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={activeSize === index ? "active" : ""}
              onClick={() => setActiveSize(index)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAddPizza} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}

export default ProductPizza;
