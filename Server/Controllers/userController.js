let User = require("../Model/users");
let Product = require("../Model/products");
// let productController = require("./productController")

// fetching users based on role
module.exports.getUsers = async (req, res) => {
  const { role } = req.body;
  try {
    if (role) throw new Error('Role not defined.');

    let users = await User.find({ role });

    if (users) {
      return res.status(201).send(users);
    } else {
      res.statusMessage = "Unable to fetch users";
      return res.status(409).end();
    }

  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while fetching the user.";
    return res.status(500).end();
  }
};

// for disable and enable vendor 
module.exports.validateVendor = async (req, res) => {
  const { uid } = req.body.uid;
  try {

    let user = await User.findOne({ uid });

    if (user) {
      let validate = user.validation;
      user.validation = !validate;

      user.markModified["validation"];
      user.save();

      return res.status(201).send("success");
    } else {
      res.statusMessage = "error";
      return res.status(409).end();
    }

  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while validating vendor.";
    return res.status(500).end();
  }
};


// Sign Up controller for manual (email or phone number) and google auth 
module.exports.signUp = async (req, res) => {

  const { uid, email, phone, authProvider } = req.body;
  let query = { uid }
  if (email !== "NA") query = { ...query, email }
  if (phone !== "NA") query = { ...query, phone }

  try {
    const user = await User.findOne(query);
    if (!user) {
      const newUser = await User.create(req.body);
      return res.status(201).send(newUser);
    } else {
      if (authProvider === "Google") {
        if (user.validation === true)
          return res.status(201).send(user);
        else
          return res.status(204).send("Your Account is Disabled");
      } else {
        return res.status(409).send("User Already Exists");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while creating the user.");
  }
};

// module.exports.signUp = async (req, res) => {
//   try {
//     let user = await User.findOne({ uid: req.body.uid });
//     let emailFound = false;
//     let phoneFound = false;
//     if (req.body.email !== "NA") {
//       let email = await User.findOne({ email: req.body.email });
//       if (email) emailFound = true;
//     }

//     if (req.body.phone !== "NA") {
//       let phone = await User.findOne({ phone: req.body.phone });
//       if (phone) phoneFound = true;
//     }


//     if (!user && emailFound === false && phoneFound === false) {
//       user = await User.create(req.body);
//       user = await User.findOne({ uid: req.body.uid });
//       return res.status(201).send(user);
//     } else {
//       if (req.body.authProvider === "Google") {
//         if (user.validation === true) {
//           return res.status(201).send(user);
//         } else {
//           res.statusMessage = "Your Account is Disabled";
//           return res.status(204).end();
//         }

//       } else {
//         res.statusMessage = "User Already Exists";
//         return res.status(409).end();
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     res.statusMessage = "An error occurred while creating the user.";
//     return res.status(500).end();
//   }
// };

module.exports.signIn = async (req, res) => {
  const { email, phone, password } = req.body;

  let query = {}
  if (email !== "NA") query = { ...query, email }
  if (phone !== "NA") query = { ...query, phone }

  try {

    let user = await User.findOne(query);

    if (user) {
      if (user.password === password) {
        if (user.validation === true) {
          return res.status(201).send(user);
        } else {
          res.statusMessage = "Your Account is Disabled";
          return res.status(204).end();
        }

      } else {
        res.statusMessage = "Wrong Password";
        return res.status(204).end();
      }
    } else {
      res.statusMessage = "User Not Present";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};


module.exports.addAddress = async (req, res) => {
  try {

    let user = await User.findOneAndUpdate(
      { uid: req.body.uid },
      { $push: { address: req.body } },
      { new: true }
    );
    return res.status(201).send(user.address);

  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.deleteItems = async (req, res) => {
  const { uid } = req.body;

  try {

    let user = await User.findOne({ uid });

    if (user) {

      if (req.body.type === "address") {
        user.address.splice(req.body.index, 1);
        user.markModified("address");
        await user.save();
        return res.status(201).send(user.address);
      } else {
        user.cart = user.cart.filter((item)=>item.pUid !== req.body.itemId)
        user.markModified("cart");
        await user.save();
        return res.status(201).send(user.cart);
      }

    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.getAddress = async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ uid: req.body.uid });
    if (user) {
      return res.status(201).send(user.address);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.addCart = async (req, res) => {

  let { uid, pUid, quantity, update } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (user) {
      const cartItemIndex = user.cart.findIndex((item) => item.pUid === pUid);
      if (cartItemIndex !== -1)
        if (update === true)
          user.cart[cartItemIndex].quantity = parseInt(quantity);
        else
          user.cart[cartItemIndex].quantity += parseInt(quantity);
      else {
        let product = await Product.findOne({ uid: pUid });
        const data = {
          uid,
          pUid,
          product,
          quantity,
        };
        user.cart.push(data);
      }


      user.markModified("cart");
      await user.save();

      return res.status(201).send(user.cart);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while adding to the cart.";
    return res.status(500).end();
  }
};

module.exports.getCartItems = async (req, res) => {
  const { uid } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {
      let cart = [];

      for (const item of user.cart) {
        let product = await Product.findOne({ uid: item.pUid });
        if (product) {
          const data = {
            product: product,
            quantity: item.quantity,
          };
          cart.push(data);
        }
      }

      return res.status(201).send(cart);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while finding cart items.";
    return res.status(500).end();
  }
};

module.exports.setUserRole = async (req, res) => {
  const { uid, role } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {
      user.role = role;
      user.markModified("role");
      await user.save();

      return res.status(201).send(user.role);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while finding cart items.";
    return res.status(500).end();
  }
};

module.exports.emptyCart = async (req, res) => {
  const { uid } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {
      user.cart = [];
      user.markModified("cart");
      await user.save();

      return res.status(201).send("delete");
    } else {
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred in deleting cart items.";
    return res.status(500).end();
  }
};

module.exports.updateProfile = async (req, res) => {
  const files = req.files;

  if (req.body.password === "" || req.body?.newPassword === "") {
    console.log("yes")
    delete req.body["password"];
    delete req.body["newPassword"];
  }

  try {
    let phoneFound = await User.findOne({ phone: req.body.phone, uid: { $ne: req.body.uid } });
    let emailFound = await User.findOne({ email: req.body.email, uid: { $ne: req.body.uid } });

    if (phoneFound || emailFound) {

      const newData = {
        user: {},
        message: "Existed!"
      }

      console.log("phone/email")

      return res.status(201).send(newData);

    } else {
      let user = await User.findOne({ uid: req.body.uid });
      console.log("yes yes", req.body.uid)
      if (user) {

        let imgUrl = [
          files?.image1 ? files?.image1[0]?.filename : user.imgUrl[0],
          files?.image2 ? files?.image2[0]?.filename : user.imgUrl[1],
        ];

        let message = "updated";
        let checked = true;
        if (user.password !== "NA" && user.password === req.body?.password) {
          req.body.password = req.body?.newPassword;
          delete req.body["newPassword"];
          checked = false
        }

        if (user.password !== req.body?.password && req.body?.password && checked) {
          console.log(user.password, "and", req.body?.password)
          message = "Password not matched!"
        }

        const updatedData = { ...req.body, imgUrl: imgUrl };
        const mergedData = { ...user.toObject(), ...updatedData };
        Object.assign(user, mergedData);
        const savedData = await user.save();

        const newData = {
          user: savedData,
          message: message
        }

        return res.status(201).send(newData);
      } else {
        res.statusMessage = "Error";
        return res.status(409).end();
      }
    }

  } catch (err) {
    console.error(err, "*******");
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};
