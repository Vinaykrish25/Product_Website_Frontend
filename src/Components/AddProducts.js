import React, { useState } from 'react';
import "./Styles/AddProducts.css";
import axios from 'axios';

const AddProducts = ({ addreference, close }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        product_name: '',
        product_description: '',
        product_price: '',
        product_rating: '',
        product_category: '',
        product_image: ''
    });

    // Validate the form
    const validateForm = () => {
        const { product_name, product_description, product_price, product_rating, product_category, product_image } = data;
        if (!product_name || !product_description || !product_price || !product_rating || !product_category || !product_image) {
            setError("Please fill out all fields");
            return false;
        }
        return true;
    };

    // Submit the product
    const createProduct = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/products`, data, { withCredentials: true });
            console.log("Product created successfully", response);
            setError('');
        } catch (err) {
            console.error("Error in adding data", err);
            setError("Error in adding the product, please try again");
        } finally {
            setIsLoading(false);
        }

        closeAndReset();
    };

    // Reset the form and close the modal
    const closeAndReset = () => {
        setData({
            product_name: '',
            product_description: '',
            product_price: '',
            product_rating: '',
            product_category: '',
            product_image: ''
        });
        close();
    };

    return (
        <div className="modal-container">
            <dialog className="product-add-modal" ref={addreference}>
                <h2>Add New Product</h2>

                <div className="product-add-form">
                    {error && <p className="error-message">{error}</p>}
                    
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        value={data.product_name}
                        onChange={(e) => setData({ ...data, product_name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Enter Product Description"
                        value={data.product_description}
                        onChange={(e) => setData({ ...data, product_description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Enter Product Price"
                        value={data.product_price}
                        onChange={(e) => setData({ ...data, product_price: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Enter Product Rating"
                        value={data.product_rating}
                        onChange={(e) => setData({ ...data, product_rating: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Enter Product Category"
                        value={data.product_category}
                        onChange={(e) => setData({ ...data, product_category: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Enter Product Image URL"
                        value={data.product_image}
                        onChange={(e) => setData({ ...data, product_image: e.target.value })}
                    />

                    <div className="product-add-buttons">
                        <button onClick={createProduct} disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Product'}
                        </button>
                        <button onClick={closeAndReset}>Cancel</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddProducts;
