import React, { useEffect, useState } from 'react';
import "./Styles/AddProducts.css";
import axios from 'axios';

const UpdateProducts = ({ updateRef,updateClose,id }) => {
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

    // Show the data in input box
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/products/${id}`, {}, {withCredentials: true})
                console.log(response);
                setData(response.data.data)
            }catch(err){
                console.error('Error in fetching data', err);
            }
        }
        fetchData()
    }, [id])

    // Update the product
    const updateData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`http://localhost:5000/products/${id}`, data, { withCredentials: true });
            console.log("Product created successfully", response);
            setError('');
        } catch (err) {
            console.error("Error in adding data", err);
            setError("Error in adding the product, please try again");
        } finally {
            setIsLoading(false);
        }
        close();
    };

    function close(){
        updateClose();
    }

    return (
        <div className="updatemodal-container">
            <dialog className="product-update-modal" ref={updateRef}>
                <h2>Edit Product</h2>

                <div className="product-update-form">
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

                    <div className="product-update-buttons">
                        <button onClick={updateData} disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                        <button onClick={close}>Cancel</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateProducts;
