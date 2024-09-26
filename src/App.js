import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import HomePage from "./Components/HomePage";
import Search from "./Components/Search";
import Login from "./Components/Login";
import Signup from "./Components/Sigup"; // Fixed typo in import (Sigup -> Signup)
import Products from "./Components/Products";
import ProductDescription from "./Components/ProductDescription";
import { useState } from "react";
import { ProductContext } from "./Context/ProductContext";

function App() {
  const [globalSearchData, setGlobalSearchData] = useState("");
  const [category, setCategory] = useState("All");

  function handleGlobalSearchData(searchItem) {
    setGlobalSearchData(searchItem);
  }

  function handleCategory(selectedCategory) {
    setCategory(selectedCategory);
  }

  return (
    <div className="App">
      <ProductContext.Provider value={{ handleCategory, handleGlobalSearchData, globalSearchData, category }}>
        <BrowserRouter>
          <Routes>
            {/* Default HomePage route */}
            <Route path="/" element={<HomePage />} />
            {/* Layout wrapper */}
            <Route path="/" element={<Layout />}>
              {/* Search and product-related routes */}
              <Route path="home" element={<Search />} />
              <Route path="products" element={<Products />} />
              <Route path="productdescription/:id" element={<ProductDescription />} />
            </Route>

            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            

            {/* 404 Page route (optional) */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
