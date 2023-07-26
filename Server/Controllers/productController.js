const Product = require("../Model/products");


module.exports.updateProduct = async (req, res) => {
  console.log("hello update",req.files)
  const files = req.files;

  let {
    uid,
    name,
    price,
    description,
    category,
    subCategory,
    vName,
    vUid,
    brandName,
    draft
  } = req.body;

  try {
    let product = await Product.findOne({ uid: req.body.uid });

    let imgUrl = [
      files?.image1 ? files?.image1[0]?.filename : product.imgUrl[0],
      files?.image2 ? files?.image2[0]?.filename : product.imgUrl[1],
      files?.image3 ? files?.image3[0]?.filename : product.imgUrl[2],
      files?.image4 ? files?.image4[0]?.filename : product.imgUrl[3],
    ];

    const data = {
      uid: uid,
      name: name,
      price: price,
      description: description,
      category: category,
      imgUrl: imgUrl,
      subCategory: subCategory,
      vName: vName,
      vUid: vUid,
      brandName: brandName,
      draft: (draft ? draft :false)
    };

    console.log(data);

    product = await Product.updateOne({ uid: req.body.uid },data);
    

    return res.redirect("http://localhost:3000/profile");
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the product.";
    return res.status(500).end();
  }
};

module.exports.addProduct = async (req, res) => {
  const files = req.files; // Use req.files instead of req.file
  console.log(files)

  let {
    uid,
    name,
    price,
    description,
    category,
    subCategory,
    vName,
    vUid,
    brandName,
    draft
  } = req.body;

  try {
    let product = await Product.findOne({ uid: req.body.uid });

    if (!product) {
      let imgUrl = [
        files.image1[0]?.filename,
        files.image2[0]?.filename,
        files.image3[0]?.filename,
        files.image4[0]?.filename,
      ];

      const data = {
        uid: uid,
        name: name,
        price: price,
        description: description,
        category: category,
        imgUrl: imgUrl,
        subCategory: subCategory,
        vName: vName,
        vUid: vUid,
        brandName: brandName,
        draft: (draft ? draft :false)
      };

      product = await Product.create(data);
      return res.status(201).send("successfull");
    } else {
      res.statusMessage = "Product Already Exists";
      return res.status(204).send("error");
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the product.";
    return res.status(500).end();
  }
};


module.exports.getProduct = async (req, res) => {
  try {
    let product = await Product.find().sort({"sales":-1});
    if (product !== []) {
      return res.status(201).send(product);
    } else {
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the product.";
    return res.status(500).end();
  }
};

module.exports.deleteProduct = async (req, res) => {
  console.log(req.body);
  try {
    let product = await Product.findOne({ uid: req.body.uid });
    if (product) {
      if(req.body.type === true) {
        await Product.deleteOne({ uid: req.body.uid }); 
      } else {
        product.stock = !product.stock;
        product.markModified("stock");
        product.save(); 
      }
     
      return res.status(201).send("Deleted Successfully!");
    } else {
      res.statusMessage = "Product not found"; 
      return res.status(404).end(); 
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while deleting the product.";
    return res.status(500).end();
  }
};

module.exports.getSingleProduct = async (req, res) => {
  console.log(req.body);
  try {
    let product = await Product.findOne({ uid: req.body.uid });
    if (product) {
      return res.status(201).send(product);
    } else {
      res.statusMessage = "Product not found"; 
      return res.status(404).end(); 
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while deleting the product.";
    return res.status(500).end();
  }
};
