import React from "react";
import qs from "qs";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { setCategoryId, setSortId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchProducts } from "../redux/slices/productsSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Product from "../components/Product";
import Skeleton from "../components/Product/Skeleton";
import Pagination from "../components/Pagination";
import NotFounded from "./NotFounded";
import { useAppDispatch } from "../redux/store";


function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {categoryId, sortId, currentPage, searchValue} = useSelector((state:any) => state.filter);
  const {items, status} = useSelector((state:any) => state.products);

  // const {searchValue} = React.useContext(myContext);


  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  }

  const fetchPizzas = async () => {

    const sortBy = sortId.type.replace('-', '');
    const order = sortId.type.includes('-') ? 'asc' : 'desc'; 
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // axios.get(`https://6458ed6a8badff578efef80d.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`)
    // .then((res) => {
    //   setItems(res.data);
    //   setSkeleton(false);
    // });

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
    const query = qs.stringify({
      type: sortId.type,
      categoryId: categoryId > 0 ? categoryId : null,
      currentPage,
    });

    navigate(`?${query}`);
    isMounted.current = true;
  }, [categoryId, sortId.type, currentPage]);


  React.useEffect(() => {
    // if (window.location.search) {
    //   const params = qs.parse(window.location.search.substring(1));
    //   if (
    //     initialState.categoryId === Number(params.categoryId) &&
    //     initialState.selectedSort === params.selectedSort &&
    //     initialState.currentPage === Number(params.currentPage)
    //   ) {
    //     fetchPizzas();
    //   }
      
    //   const sort = listPopup.find((obj) => obj.type === params.type);
      
    //   dispatch(setFilters({
    //     ...params,
    //     sortId: sort,
    //   }),
    //   );
    //   isSearch.current = true;
    // }
    fetchPizzas();
  }, [categoryId, sortId.type, searchValue, currentPage]);


  React.useEffect(() => {
    if (!isSearch.current) {
    fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortId.type, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)}/>
        <Sort value={sortId} onClickSort={(id) => dispatch(setSortId(id))}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' 
      ? 
        <NotFounded/>
      : 
        (
          <div className="content__items"> 
          {status === 'loading'
            ? [...new Array(6)].map((_, index) =>   <Skeleton key={index} />)
            : items.map((pizza: any, i: number) => <Link to={`/pizza/${pizza.id}`} key={i}><Product  {...pizza}/></Link>)}
          </div>
        )
      }
      <Pagination currentPage = {currentPage} onChangePage = {(number) => dispatch(setCurrentPage(number))}/>
    </div>
  );
}

export default Home;
