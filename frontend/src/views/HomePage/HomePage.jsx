import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Products } from '../../components/Products/Products';
import { Loading } from '../../components/Loading';
import { MessageBox } from '../../components/MessageBox';

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
    {
      products 
      ? 
      <div className="products">
          <h1 className="title">Products</h1>
          <Products products={products}></Products>
      </div>
      :
      <div>
          <MessageBox variant="danger">Be carefull</MessageBox>
          <Loading></Loading>
      </div>
    }
    </>
  )
}
