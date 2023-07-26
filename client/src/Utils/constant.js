export const BASE_IMG_URL = "http://localhost:8000/Products/";
export const BASE_USER_IMG_URL = "http://localhost:8000/Users/";
export const logo = "https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"

export const getValues = (product) => {

    const data = {
        name: product ? product?.name : "",
        category: product ? product?.category : "",
        subCategory: product ? product?.subCategory : "",
        price: product ? product?.price : "",
        description: product ? product?.description : "",
        uid: product ? product?.uid : "",
        vName: product ? product?.vName : "",
        vUid: product ? product?.vUid : "",
        brandName: product ? product?.brandName : "",
        draft: product ? product?.draft : false,
    }
    return data;
}

export const getImages = (product) => {
    const data = {
        image1: (product ? (BASE_IMG_URL + product?.imgUrl[0]) : ""),
        image2: (product ? (BASE_IMG_URL + product?.imgUrl[1]) : ""),
        image3: (product ? (BASE_IMG_URL + product?.imgUrl[2]) : ""),
        image4: (product ? (BASE_IMG_URL + product?.imgUrl[3]) : ""),
    }
    return data;
}

export const getUserImages = (user) => {
    let data = {}
    if (Object.keys(user).length === 0) {
        user = {
            imgUrl: ["NA", "NA"]
        }
    }
    data = {
        image1: (user?.imgUrl[0] !== "NA" ? (BASE_USER_IMG_URL + user?.imgUrl[0]) : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png"),
        image2: (user?.imgUrl[1] !== "NA" ? (BASE_USER_IMG_URL + user?.imgUrl[1]) : "https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"),
    }
    return data;
}

export const callouts = [
    {
      name: '',
      description: 'Women Collection',
      imageSrc: require("../assets/images/women.png"),
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
      value: "female"
    },
    {
      name: '',
      description: 'Latest Collection',
      imageSrc: 'https://i.pinimg.com/originals/c7/09/ac/c709acb1309dfcccc6aa0d67a90a316c.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
      value: "all"
    },
    {
      name: '',
      description: 'Men Collection',
      imageSrc: require("../assets/images/man.png"),
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
      value: "male"
    },
  ]

export const dummyData = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#", 
    breadcrumbs: [
      { id: 1, name: "Men", href: "#" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export const reviews = { href: "#", average: 4, totalCount: 117 };
  
export const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
}

export const getCartDetails = (data) => {
  let quantity = 0;
  let sum = 0;
  data.forEach((item) => {
    let price =
      parseInt(item.product.price) * parseInt(item.quantity);
    quantity = quantity + parseInt(item.quantity);
    sum = sum + price;
  });
  return { sum, quantity };
};