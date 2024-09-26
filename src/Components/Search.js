import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Styles/Search.css";
import { FaFilter, FaSearch, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { ProductContext } from '../Context/ProductContext';

const Search = () => {
    const { handleGlobalSearchData, handleCategory, category, globalSearchData } = useContext(ProductContext);
    const [searchItems, setSearchItems] = useState("");
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [filterCount, setFilterCount] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching
    const navigate = useNavigate();
    const role = localStorage.getItem('role');  // Fetch role from localStorage

    function handleShowData(id) {
        navigate(`/productdescription/${id}`);
    }

    function handleSearch(e) {
        const searchValue = e.target.value;
        setSearchItems(searchValue);
        handleGlobalSearchData(searchValue);
    }

    // Increment filter count if a category is selected
    function handleCount(selectedCategory) {
        setFilterCount(selectedCategory !== "All" ? 1 : 0);
    }

    // Fetch products from server
    useEffect(() => {
        let isMounted = true;
        async function fetchProducts() {
            try {
                let url = `http://localhost:5000/products`;
                if (category && category !== "All") {
                    url += `?product_category=${category}`;
                }
                const response = await axios.get(url, { withCredentials: true });
                if (isMounted) {
                    const products = Array.isArray(response.data) ? response.data : response.data?.data || [];
                    setProducts(products);
                    setLoading(false); // Set loading to false after fetching
                }
            } catch (error) {
                console.error('Error in fetching data:', error);
                setLoading(false); // Ensure loading is stopped even in case of errors
            }
        }
        fetchProducts();
        return () => { isMounted = false };
    }, [category]);

    // Filter products by both search query and selected category
    const searchData = products.filter((item) => {
        const matchesSearch = item.product_name.toLowerCase().startsWith(globalSearchData.toLowerCase());
        return matchesSearch;
    });

    return (
        <div>
            <div className="search-container">
                <div className="search-box">
                    <FaSearch id="search-icon" />
                    <input
                        type="search"
                        id="search-bar"
                        name="search"
                        placeholder="Search for a product"
                        value={searchItems}
                        onChange={handleSearch}
                    />
                </div>
                <div className="filter-cart">
                    <div className="filter">
                        <select value={category}  onChange={(e) => {
                            const selectedCategory = e.target.value;
                            handleCategory(selectedCategory);  // Update the category state
                            handleCount(selectedCategory);    // Update the filter count state
                        }}>
                            <option value="All">All</option>
                            <option value="Shoe">Shoe</option>
                            <option value="Sports">Sports</option>
                            <option value="Dress">Dress</option>
                            <option value="Mobile Accessories">Mobile Accessories</option>
                        </select>
                    </div>
                    <div className="filter-icon">
                        <h2><FaFilter /></h2>
                        <span>{filterCount}</span>
                    </div>
                    <div className="cart">
                        <h2><FaShoppingCart /></h2>
                        <span>{cartCount}</span>
                    </div>
                </div>
            </div>
            <div className="heading">
                <h1>Products</h1>
            </div>
            <div className="product-list">
                {searchData.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img
                            src={product.product_image}
                            alt="product"
                            onClick={() => handleShowData(product._id)}
                        />
                        <h4 onClick={() => handleShowData(product._id)}>{product.product_name}</h4>
                        <div className="product-price">
                            <FaIndianRupeeSign />
                            <span>{product.product_price}</span>
                        </div>
                        <div className="product-rating">
                            <FaStar /> <span>{product.product_rating || "N/A"}</span>
                        </div>
                        <FaRegHeart className="heart-icon" />
                        <div id="add-to-cart">
                            <button>Add to Cart</button>
                            <button>Remove from cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
