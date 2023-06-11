import React from "react";
import styles from "./Search.module.scss";
import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
//@ts-ignore
import debounce from "lodash.debounce";
import { current } from "@reduxjs/toolkit";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
      dispatch(setSearchValue(""));
      setValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
  };

  const debounceOnChangeInput = React.useCallback(
    debounce((str: string) => {
        dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debounceOnChangeInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
        <img className={styles.search} src={searchIcon} alt="search icon"/>
        <input 
            ref={inputRef}
            className={styles.input} 
            type="text" 
            placeholder="Поиск..." 
            value={value}
            onChange={onChangeInput}
        />
        {value && <img className={styles.close} src={closeIcon} alt="close icon" onClick={onClickClear}/>}
    </div>
  )
   
};

export default Search;
