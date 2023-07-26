import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { ModalData, ProductItems } from "./";
import "../../assets/styles/products.css";
import axios from "axios";

const Products = (props) => {
  const { draft,display,type } = props;
  const userData = useSelector((state) => state.users.userData);
  const [products, setProducts] = useState([]);
  const [orders,setOrders] = useState([]);

  const [deleteProduct, setDeleteProduct] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/product/get-product"
        );

        if (response.status === 201) {
          setProducts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
    console.log("from producst")
    
  }, [props?.productPageUpdate,deleteProduct]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{display}</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {type !== "orders" && products.map(
              (product) =>
                (product?.vUid === userData.uid || userData?.role === "Admin") && (draft === false ?
                  product?.draft === false && <ProductItems key={product.uid} product={product} setDeleteProduct={setDeleteProduct} display={display} /> :
                  product?.draft === true && <ProductItems key={product.uid} product={product} setDeleteProduct={setDeleteProduct} display={display} />
                )
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
