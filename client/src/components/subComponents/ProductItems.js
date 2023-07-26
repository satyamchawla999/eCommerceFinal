import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ModalData } from "./";
import { useSelector } from "react-redux";
import { notification} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductItems = (props) => {
  const { product, setDeleteProduct } = props;
  const userData = useSelector((state) => state.users.userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [options, setOptions] = useState(false);
  const [stock,setStock] = useState(product?.stock)
  const [productPageUpdate, setProductPageUpdate] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({ message: message });
  };

  const navigate = useNavigate();

  useEffect(() => {
    // setDeleteProduct((prevValues) => !prevValues);
    console.log("updated")
  }, [productPageUpdate])

  const showModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setInfo(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:8000/product/delete",
        { uid: product.uid , type:true }
      );
      if (response.status === 201) {
        console.log("Deleted Successfully!");
        setDeleteProduct((prevValues) => !prevValues);
        openNotificationWithIcon("success", "Product Deleted Successfully");

      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductPage = (e) => {
    // e.stopPropagation()
    console.log(props?.display);
    if(props?.display !== "Your Products" && props?.display !== "Draft") {
      isModalOpen !== true && navigate(`/productpage/${product.uid}`);
    }
    
  };

  const handleInfo = (e) => {
    // e.stopPropagation();
    setInfo(true);
    showModal(e);
  };

  const handleOption = (e) => {
    e.stopPropagation();
    // setInfo(true);
    setOptions(!options);

    // showModal(e);
  };

  const handleStock = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/product/delete",
        { uid: product.uid , type:false }
      );
      if (response.status === 201) {
        console.log("Deleted Successfully!");
        setStock(!stock)
        // setDeleteProduct((prevValues) => !prevValues);
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(product)

  return (
    <div onClick={handleProductPage} className="handleProduct">
      {contextHolder}
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            {userData.role === "Customer" ? (
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            ) : userData.uid === product.vUid || userData.role === "Admin" ? (
              <p className="mt-1 text-sm text-gray-500">Rs {product.price}</p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            )}
          </div>

          {userData.role === "Customer" ? (
            <p className="text-sm font-medium "> Rs {product.price}</p>
          ) : userData.uid === product.vUid || userData.role === "Admin" ? (
            <>
              <p className="text-sm font-medium">
                {/* <span>
                  <button
                    className="editIcon"
                    onClick={showModal}
                    data-name="edit"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                </span>

                <button
                  className="text-red-500 ml-4 editIcon"
                  onClick={handleDelete}
                >
                  <i className="fa-regular fa-trash-can"></i> Delete
                </button> */}

                {/* <button
                  className="text-green-500 ml-4 editIcon"
                  onClick={handleInfo}
                >
                  <i class="fa-solid fa-circle-info"></i> Info
                </button> */}

                <button
                  className="text-black-500 ml-4 editIcon"
                  onClick={handleOption}
                >
                  Options <i class="fa-solid fa-caret-down"></i>
                </button>

                {options && <div>
                  <span>
                    <button
                      className="editIcon"
                      onClick={showModal}
                      data-name="edit"
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                  </span>
                  <br/>
                  <span>
                    <button
                      className="text-red-500 ml-0 editIcon"
                      onClick={handleDelete}
                    >
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </button>
                  </span>
                  <br/>
                  <button
                  className="text-green-500 ml-0 editIcon"
                  onClick={handleInfo}
                >
                  <i class="fa-solid fa-circle-info"></i> Info
                </button>
                </div>}


                {/* <button
                  className="text-green-500 ml-4 editIcon"
                  onClick={handleInfo}
                >
                  <i class="fa-solid fa-circle-info"></i> Info
                </button> */}

              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium "> Rs {product.price}</p>
            </>
          )}
        </div>
      </div>

      <Modal
        title={info ? "Product Info" : "Edit Product"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={info ? 500 : 1000}
      >
        {info ? (
          <div className="infoContainer">
            <div className="infoImage">
              <img
                src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
                alt="#"
              />
               <img
                src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
                alt="#"
              />
               <img
                src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
                alt="#"
              />
               <img
                src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
                alt="#"
              />
            </div>
            <div className="infoItems">
              <p><span>Product Name</span>  : <span className="span">{product?.name}</span></p>
              <p><span>Product Price</span> : <span className="span">{product?.price}</span></p>
              <p><span>Units Sold</span>    : <span className="span">{product?.units}</span></p>
              <p><span>Total Sales</span>   : <span className="span">{product?.sales}</span></p>
              <p><span>Stock</span>         : <span className="span" ><button className={stock ? "stockButtonGreen" : "stockButtonRed"} onClick={handleStock}>{stock===true ? " In stock" : "Out of stock"}</button></span></p>
            </div>
          </div>
        ) : (
          // <ModalData product={product} handleCancel={handleCancel} setProductPage={setProductPage}/>
          <ModalData product={product} handleCancel={handleCancel} setProductPageUpdate={setProductPageUpdate} />
        )}
      </Modal>
    </div>
  );
};

export default ProductItems;
