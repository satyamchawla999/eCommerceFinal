import React, { useState } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { addProduct } from "../../Utils/service";

import { getValues, getImages } from "../../Utils/constant";

const ModalData = (props) => {
  const { product, handleCancel, setProductPage } = props;
  const userData = useSelector((state) => state.userData);

  const [values, setValues] = useState(getValues(product));
  const [img, setImg] = useState(getImages(product));
  const [draft, setDraft] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({ message: message });
  };
  const isRequired = product ? false : true;
  const formAction = product ? "update-product" : "add-product";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    try {
      const response = await addProduct(formAction, formData);
      if (response.status === 201) {
        openNotificationWithIcon("success", "Product Added Successfully");
        console.log("added");
      } else {
        openNotificationWithIcon("error", "Please Try Again");
      }
    } catch (err) {
      console.error("Error submitting form data:", err);
    }
    // Clear form data

    if (!product) {
      setValues(getValues(null)); // Reset to initial values or an empty state
      setImg(getImages(null));
      e.target.reset(); // Reset the form fields
    }

    handleCancel();
    props?.setProductPageUpdate((prevValues) => !prevValues);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg((prevImg) => ({
          ...prevImg,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValues = (e) => {
    setValues(e.target.value);
  };

  const handleDraft = () => {
    setDraft(!draft);
  };

  return (
    <>
      {contextHolder}
      <form
        className="modalForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="inputContainer">
          <div className="fileInput">
            <label htmlFor="image1">
              <img src={img.image1} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image1"
              type="file"
              name="image1"
              accept="image/*"
              required={isRequired}
            />

            <label htmlFor="image2">
              <img src={img.image2} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image2"
              type="file"
              name="image2"
              accept="image/*"
              required={isRequired}
            />

            <label htmlFor="image3">
              <img src={img.image3} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image3"
              type="file"
              name="image3"
              accept="image/*"
              required={isRequired}
            />

            <label htmlFor="image4">
              <img src={img.image4} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image4"
              type="file"
              name="image4"
              accept="image/*"
              required={isRequired}
            />
          </div>
          <div className="valueInput">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={values?.name}
              onChange={handleValues}
              required
              pattern="^\S+.*$"
            />

            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>

            <label htmlFor="subCategory">Sub Category</label>
            <select name="subCategory" id="subCategory">
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-shirt</option>
              <option value="shoes">Shoes</option>
              <option value="jeans">Jeans</option>
            </select>

            <label>Price</label>
            <input
              type="number"
              name="price"
              required
              value={values?.price}
              onChange={handleValues}
            />

            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              value={values?.description}
              onChange={handleValues}
            />

            <label>Product Code</label>
            <input
              type="text"
              name="uid"
              required
              value={values?.uid}
              disabled={product ? true : false}
              onChange={handleValues}
              pattern="^\S+.*$"
            />
            {product && (
              <input
                style={{ display: "none" }}
                type="text"
                name="uid"
                required
                value={values?.uid}
              />
            )}

            <input
              className="disable"
              type="text"
              name="vName"
              value={product ? values?.vName : userData.name}
              onChange={handleValues}
              required
              pattern="^\S+.*$"
            />

            <input
              className="disable"
              type="text"
              name="vUid"
              value={product ? values?.vUid : userData.uid}
              onChange={handleValues}
              required
              pattern="^\S+.*$"
            />

            <label>Brand Name</label>
            <input
              type="text"
              name="brandName"
              required
              value={values?.brandName}
              onClick={handleValues}
              pattern="^\S+.*$"
            />

            {product && product?.draft === true && (
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="draft"
                onClick={handleDraft}
              >
                <input
                  style={{
                    height: "18px",
                    width: "18px",
                    margin: "0px",
                    padding: "0",
                  }}
                  checked={draft}
                  id="draft"
                  name="draft"
                  type="checkbox"
                  value={values?.draft === true ? !draft : draft}
                />
                <label style={{ marginLeft: "5px" }} htmlFor="draft">
                  {values?.draft === true ? <>Publish</> : <>Add To Draft</>}
                </label>
              </div>
            )}

            {!product && (
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="draft"
                onClick={handleDraft}
              >
                <input
                  style={{
                    height: "18px",
                    width: "18px",
                    margin: "0px",
                    padding: "0",
                  }}
                  checked={draft}
                  id="draft"
                  name="draft"
                  type="checkbox"
                  value={values?.draft === true ? !draft : draft}
                />
                <label style={{ marginLeft: "5px" }} htmlFor="draft">
                  {values?.draft === true ? <>Publish</> : <>Add To Draft</>}
                </label>
              </div>
            )}
          </div>
          ;
        </div>

        <div className="formButton">
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default ModalData;
