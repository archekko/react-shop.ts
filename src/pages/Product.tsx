import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Product: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = React.useState<{
        title: string;
        imageUrl: string;
        price: number;
    }>();

    React.useEffect(() => {
        async function fetchProduct() {
            try {
                const {data} = await axios.get(`https://6458ed6a8badff578efef80d.mockapi.io/items/` + id);
                setProduct(data);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }
        fetchProduct();
    }, []);

    if (!product) {
        return <>Loading...</>;
    }

  return (
    <div className='container'>
        <h1>{product.title}</h1>
        <img src={product.imageUrl} alt=""/>
        <p>Product description</p>
        <h4>Price: {product.price}</h4>
    </div>
  )
};

export default Product;
