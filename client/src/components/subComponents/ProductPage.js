import axios from "axios";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../features/user/actionCreator";
import { getImages, getValues, dummyData,reviews,classNames } from "../../Utils/constant";

import "../../assets/styles/productPage.css"

const ProductPage = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const userData = useSelector((state) => state.users.userData);

  const [api, contextHolder] = notification.useNotification();
  
  const [img, setImg] = useState({});
  const [stock, setStock] = useState(true)
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(dummyData.sizes[2]);
  const [selectedColor, setSelectedColor] = useState(dummyData.colors[0]);
  
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/product/get-single-product",
          { uid: id }
        );

        if (response.status === 201) {
          setProduct(getValues(response.data));
          setImg(getImages(response.data));
          setStock(response.data.stock)
        }
      } catch (err) {
        console.log(err);
      }
    };
    setQuantity(1)
    getProduct();
  }, []);

  const handleIncrement = () => {
    if (quantity < 10) 
      setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) 
      setQuantity(quantity - 1);
  };

  const handleCart = async (e) => {

    e.preventDefault()
    if(!user) {
      openNotificationWithIcon("error", "Please login first");
      return;
    }

    const data = {
      uid: userData.uid,
      pUid: id,
      quantity: quantity,
      update: false
    }

    try {
  
      dispatch(fetchCartItems(data)).unwrap().then((result)=>{
        if(result.status === 201) {
          openNotificationWithIcon("success", "Added to cart");
        }
      });
      setQuantity(1);
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white">
      {contextHolder}
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={img?.image1}
              alt={dummyData.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={img?.image2}
                alt={dummyData.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={img?.image3}
                alt={dummyData.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={img?.image4}
              alt={dummyData.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {stock === true ? <> Rs {product?.price}</> : <> Out of Stock</>}

            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {dummyData.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>


              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {dummyData.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.name}
                            </RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>


              {stock && <>
                <p style={{ marginTop: "30px" }}>Add Quantity</p> <div className="qtyBtn">
                  <span className="qtyBtn" onClick={handleDecrement}>-</span>
                  &nbsp;{quantity}&nbsp;
                  <span className="qtyBtn" onClick={handleIncrement}>+</span>
                </div>

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add To Cart &nbsp; <i class="fa-brands fa-opencart"></i>
                </button>
              </>}

            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {dummyData.description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {dummyData.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{dummyData.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
