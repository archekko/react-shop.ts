import React from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory}) => {
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory});

  const categoriesItem = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onSelectItem = (index: number) => {
    onChangeCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categoriesItem.map((name, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onSelectItem(index)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
