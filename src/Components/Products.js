import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "./Styles/Products.css";
import { ProductContext } from '../Context/ProductContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddProducts from "../Components/AddProducts";
import UpdateProducts from "../Components/UpdateProducts";
import ConfirmDelete from './ConfirmDelete';
import Api from './Api';

const Products = () => {
    const { handleGlobalSearchData, handleCategory, category, globalSearchData } = useContext(ProductContext);
    const [userRole, setUserRole] = useState(null); // Ensure the initial state is null to differentiate between loading and no role
    const [searchProducts, setSearchProducts] = useState("");
    const [displayProducts, setDisplayProducts] = useState([]);
    const [filterCount, setFilterCount] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching
    const addProducts = useRef(); // AddProducts modal ref
    const updateProducts = useRef(); // UpdateProducts modal ref
    const deleteProducts = useRef(); // DeleteProducts modal ref
    const [selectedId, setSelectedId] = useState(null); // Selected product for update or delete
    const navigate = useNavigate();

    // Show details of a particular product
    function handleShowData(id) {
        navigate(`/productdescription/${id}`);
    }

    // Open AddProducts modal
    function openModal() {
        addProducts.current.showModal();
    }

    // Close AddProducts modal
    function closeModal() {
        addProducts.current.close();
    }

    // Open UpdateProducts modal
    function openUpdateModal(id) {
        setSelectedId(id);
        updateProducts.current.showModal();
    }

    // Close UpdateProducts modal
    function closeUpdateModal() {
        updateProducts.current.close();
    }

    // Open DeleteProducts modal
    function openDeleteModal(id) {
        setSelectedId(id);
        deleteProducts.current.showModal();
    }

    // Close DeleteProducts modal and delete the product
    const closeDeleteModal = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/${selectedId}`, { withCredentials: true });
            setDisplayProducts(displayProducts.filter((item) => item.id !== selectedId));
            deleteProducts.current.close();
        } catch (err) {
            console.error("Error in deleting", err);
        }
    };

    // Increment filter count if a category is selected
    function handleCount(selectedCategory) {
        setFilterCount(selectedCategory !== "All" ? 1 : 0);
    }

    // Handle search input
    function handleSearch(e) {
        const searchValue = e.target.value.toLowerCase();
        setSearchProducts(searchValue);
        handleGlobalSearchData(searchValue);
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
                    setDisplayProducts(products);
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

    // Fetch user role and check authentication
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await Api.post('/users/verify', { withCredentials: true });
                if (response.data?.user?.role) {
                    setUserRole(response.data.user.role); // Set the user role
                    setIsAuthenticated(true); // Mark as authenticated
                } else {
                    console.error("No user role found");
                    setUserRole(null); // No role found, set it to null
                    setIsAuthenticated(false); // Mark as unauthenticated
                }
            } catch (err) {
                console.error("Error fetching user role", err);
                setUserRole(null); // Ensure userRole is null in case of error
                setIsAuthenticated(false);
            }
        };
        fetchUserRole(); }, []); // Only fetch on component mount
        // Filter products based on search input
const searchData = displayProducts.filter((item) =>
    item.product_name.toLowerCase().startsWith(globalSearchData) ||
    item.product_name.toUpperCase().startsWith(globalSearchData)
);

// Render loading state
if (loading) {
    return <h4>Loading products...</h4>;
}

// Render error or no role found message
if (userRole === null && !isAuthenticated) {
    return <h4>Error: User not authenticated or role not found.</h4>;
}

return (
    <div className='products-container'>
        <div className="products-header">
            <div className="products-searchbox">
                <input
                    type="text"
                    placeholder="Search Your Products..."
                    value={searchProducts}
                    onChange={handleSearch}
                />
                <button><FaSearch /></button>
            </div>
            <div className="products-filter">
                <select
                    name="filter"
                    onChange={(e) => {
                        const selectedCategory = e.target.value;
                        handleCategory(selectedCategory);
                        handleCount(selectedCategory);
                    }}
                >
                    <option value="All">All</option>
                    <option value="Shoe">Shoe</option>
                    <option value="Sports">Sports</option>
                    <option value="Dress">Dress</option>
                    <option value="Mobile Accessories">Mobile Accessories</option>
                </select>
                <h2><FaFilter /> <span>{filterCount}</span></h2>
            </div>
        </div>
        <div className="products-section">
            <div className="category-heading">
                <h2>Admin Page</h2>
                {/* Conditionally show "Add Product" button for admins */}
                {userRole === 'admin' && (
                    <h2 onClick={openModal}>Add Product +</h2>
                )}
            </div>

            <div className="products-cards">
                {searchData.length > 0 ? searchData.map((ele) => (
                    <div className="products" key={ele._id}>
                        <img
                            src={ele.product_image}
                            alt={ele.product_name}
                            onClick={() => handleShowData(ele._id)}
                        />
                        <div className='products-card-details'>
                            <p>{ele.product_name}</p>
                            <p><FaIndianRupeeSign />{ele.product_price}</p>
                        </div>
                        <div className='products-rating-items'>
                            <FaStar /> <span>{ele.product_rating || "N/A"}</span>
                        </div>
                        <div id='products-add-to-cart'>
                            {/* Conditionally show "Edit" and "Remove" buttons for admins */}
                            {userRole === 'admin' && (
                                <>
                                    <button onClick={() => openUpdateModal(ele._id)}>Edit Product</button>
                                    <button onClick={() => openDeleteModal(ele._id)}>Remove</button>
                                </>
                            )}
                        </div>
                    </div>
                )) : <h4>No Products Found</h4>}
            </div>
        </div>
        <AddProducts addreference={addProducts} close={closeModal} />
        <UpdateProducts updateRef={updateProducts} updateClose={closeUpdateModal} id={selectedId} />
        <ConfirmDelete deleteRef={deleteProducts} deleteClose={closeDeleteModal} />
    </div>
);
};

export default Products;
