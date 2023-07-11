import React from 'react'
import data from "../data";

export const HomePage = () => {
  return (
    <>
        <h1>Products</h1>
        <div className="products">
            {data.products.map((prod, index) => (
                <div key={index} className="product">
                    <img src={prod.image} alt={prod.name} width={300} />
                    <p>{prod.name}</p>
                    <p>{prod.price}</p>
                </div>
            ))}
        </div>
    </>
  )
}
