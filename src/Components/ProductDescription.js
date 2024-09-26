import React, { useEffect, useState } from 'react';
import "./Styles/ProductDescription.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDescription = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await axios.get(`http://localhost:5000/products/${id}`, {}, { withCredentials: true });
              if (response.data) {
                  setProduct(response.data.data);  // Set the product data
              }
          } catch (err) {
              console.error("Error in displaying data", err);
          }
      }
      fetchData();
  }, [id]);

  if (!product) {
      return <p>Loading...</p>;  // Display loading if product is not fetched
  }

  return (
      <div className="product-view-container">
          <div className="product-image">
              <img
                  src={product.product_image}
                  alt={product.product_name}
                  width={300}
                  height={300}
                  style={{ borderRadius: "10%" }}
              />
          </div>
          <div className="product-details">
              <h2>{product.product_name}</h2>
              <p>{product.product_description}</p>
              <p><FaIndianRupeeSign />{product.product_price}</p>
              <p>Rating: {product.product_rating}</p>
              <p>Category: {product.product_category}</p>
          </div>
      </div>
  );
};

export default ProductDescription;
