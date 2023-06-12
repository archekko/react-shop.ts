import React from "react";
import { useWhyDidYouUpdate } from "ahooks";
import { Sort, SortTypeEnum, setSortId } from "../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

type sortItem = {
  name: string;
  type: SortTypeEnum;
}

type SortProps = {
  value: sortItem;
}

// type OnClickPopup = MouseEvent & {
//   path: Node[];
// }

export const sortList: sortItem[] = [
  {name: "популярности(DESC)", type: SortTypeEnum.RATING_DESC},
  {name: "популярности(ASC)", type: SortTypeEnum.RATING_ASC},
  {name: "цене(DESC)", type: SortTypeEnum.PRICE_DESC},
  {name: "цене(ASC)", type: SortTypeEnum.PRICE_ASC},
  {name: "алфавиту(DESC)", type: SortTypeEnum.TITLE_DESC},
  {name: "алфавиту(ASC)", type: SortTypeEnum.TITLE_ASC},
];

const SortPopup: React.FC<SortProps> = React.memo(({value}) =>  {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const onSelectItem = (obj: sortItem) => {
    dispatch(setSortId(obj));
    setOpenPopup(false);
    
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const _event = event as OnClickPopup;
      const {target} = event;
      if (target instanceof Node && sortRef.current && !sortRef.current.contains(target)) {
        setOpenPopup(false);
      }
      // if (sortRef.current && !_event.path.includes(sortRef.current)) {
      //   setOpenPopup(false);
      // }
    };
  
    document.body.addEventListener("click", handleClickOutside);
  
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenPopup(!openPopup)}>
          {value.name}
        </span>
      </div>
      {openPopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                className={value.type === obj.type ? "active" : ""}
                onClick={() => onSelectItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
