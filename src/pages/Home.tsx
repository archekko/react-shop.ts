import React from "react";
import qs from "qs";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { setCategoryId, setSortId, setCurrentPage, selectFilters} from "../redux/slices/filterSlice";
import {Status, fetchProducts, selectProductData } from "../redux/slices/productsSlice";
import Categories from "../components/Categories";
import Product from "../components/Product";
import Skeleton from "../components/Product/Skeleton";
import Pagination from "../components/Pagination";
import NotFounded from "./NotFounded";
import { useAppDispatch } from "../redux/store";
import Sort from "../components/Sort";


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);

  const {categoryId, sortId, currentPage, searchValue} = useSelector(selectFilters);
  const {items, status} = useSelector(selectProductData);

  // const {searchValue} = React.useContext(myContext);


  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);


  const fetchPizzas = async () => {
    const sortBy = sortId.type.replace('-', '');
    const order = sortId.type.includes('-') ? 'asc' : 'desc'; 
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchProducts({
      sortBy,
      order,
      category,
      search,
      currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    fetchPizzas();
  }, [categoryId, sortId.type, currentPage, searchValue]);
  
  const pizzas = items.map((obj: any) => <Product key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)}/>
        <Sort value={sortId}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.FAILED
      ? 
        (<NotFounded/>)
      : 
        (
          <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
        )
      }
      <Pagination currentPage = {currentPage} onChangePage = {(number) => dispatch(setCurrentPage(number))}/>
    </div>
  );
}

export default Home;
