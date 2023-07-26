import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "antd";
import axios from "axios";
import "../../assets/styles/updateProfile.scss";
import { getUserImages } from "../../Utils/constant";
import { setUserData } from "../../features/user/userSlice";
import { updateProfile } from "../../Utils/service";

const UpdateProfile = (props) => {
  const { display } = props;
  let userData = useSelector((state) => state.users.userData);
  const [values, setValues] = useState({
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone === "NA" ? "" : userData?.phone,
    bName: userData?.bName,
    bType: userData?.bType,
    gNo: userData?.gNo,
  });

  const dispatch = useDispatch();

  const [img, setImg] = useState(getUserImages(userData));
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({ message: message });
  };

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // const getUser = async () => {
    //   try {
    //     const response = await axios.post("http://localhost:8000/user/get-user", { uid: userData.uid });
    //     if (response.status === 201) {
    //       dispatch(setUserData(response.data));
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getUser();
  }, [update]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    try {
      const response = await updateProfile(formData) 
      if (response.status === 201) {
        if (response.data.message === "Existed!") {
          openNotificationWithIcon(
            "error",
            "User with the same phone number or email already exists"
          );
        } else {
          userData = response.data.user;
          dispatch(setUserData(userData));
          if (response.data.message !== "updated") {
            openNotificationWithIcon(
              "error",
              "Password not matched, rest fields are updated!"
            );
          } else {
            openNotificationWithIcon(
              "success",
              "Profile Updated Successfully!"
            );
          }
        }
        setUpdate(!update);
      } else {
        openNotificationWithIcon("error", "Please Try Again");
      }
    } catch (err) {
      console.error("Error submitting form data:", err);
    }
    // handleCancel();
    // e.target.password.value = "";
    // e.target?.newPassword?.value = "";
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
    const { name, value } = e.target;

    // const trimmedValue = value.trim();

    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return (
    <div className="updateProfile">
      {contextHolder}
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {display}
      </h2>

      <form
        className="updateProfileContainer"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="profileLeftBlock">
          <div className="profileImg">
            <label htmlFor="image1">
              <img src={img?.image1} alt="#" />
              <p>Profile Image</p>
            </label>
            <input
              onChange={handleChange}
              id="image1"
              type="file"
              name="image1"
              accept="image/*"
            />
          </div>
          {userData.role !== "Customer" ? (
            <div className="logo">
              <label htmlFor="image2">
                <img src={img.image2} alt="#" />
                <p>Business Logo</p>
              </label>
              <input
                onChange={handleChange}
                id="image2"
                type="file"
                name="image2"
                accept="image/*"
              />
            </div>
          ) : (
            <div className="logo">
              <label>
                <img src={img.image2} alt="#" />
              </label>
            </div>
          )}
        </div>

        <div className="profileRightBlock">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={values?.name}
            onChange={handleValues}
            pattern="^\S+.*$"
            required
          />
          <label>Email</label>

          {userData?.email !== "NA" ? (
            <input
              type="email"
              name="email"
              value={values?.email}
              onChange={handleValues}
              pattern="^\S+.*$"
              disabled
            />
          ) : (
            <input
              type="email"
              name="email"
              value={values?.email}
              pattern="^\S+.*$"
              onChange={handleValues}
            />
          )}

          <input
            type="text"
            name="uid"
            value={userData.uid}
            style={{ display: "none" }}
            pattern="^\S+.*$"
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={values?.phone}
            onChange={handleValues}
            pattern="^\S+.*$"
            required
          />

          {userData?.password === "NA" && (
            <>
              <label>Set Password</label>
              <input
                type="password"
                name="password"
                value={values?.password}
                onChange={handleValues}
                pattern="^\S+.*$"
              />
            </>
          )}

          {userData?.password !== "NA" && (
            <>
              <label>Old Password</label>
              <input
                type="password"
                name="password"
                value={values?.password}
                onChange={handleValues}
                pattern="^\S+.*$"
              />
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={values?.newPassword}
                onChange={handleValues}
                pattern="^\S+.*$"
              />
            </>
          )}

          {userData.role !== "Customer" && (
            <>
              <label>Business name</label>
              <input
                type="text"
                name="bName"
                value={values?.bName}
                onChange={handleValues}
                pattern="^\S+.*$"
              />
              <label>Business type</label>
              <input
                type="text"
                name="bType"
                value={values?.bType}
                onChange={handleValues}
                pattern="^\S+.*$"
              />

              <label>GST Number</label>
              <input
                type="text"
                name="gNo"
                value={values?.gNo}
                onChange={handleValues}
                pattern="^\S+.*$"
              />
            </>
          )}

          <button className=".button">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { notification } from "antd";
// import axios from "axios";
// import "../../assets/styles/updateProfile.scss";
// import { getUserImages } from "../../Utils/constant";
// import { setUserData } from "../../features/user/userSlice";

// const UpdateProfile = (props) => {
//   const { display } = props;
//   let userData = useSelector((state) => state.userData);
//   const [values, setValues] = useState({
//     name: userData?.name,
//     email: userData?.email,
//     phone: userData?.phone,
//     bName: userData?.bName,
//     bType: userData?.bType,
//     gNo: userData?.gNo,
//   });

//   const dispatch = useDispatch();

//   const [img, setImg] = useState(getUserImages(userData));
//   const [api, contextHolder] = notification.useNotification();
//   const openNotificationWithIcon = (type, message) => {
//     api[type]({ message: message });
//   };

//   const [update, setUpdate] = useState(false);

//   useEffect(()=>{
//   //   const getUser = async ()=>{
//   //     try {
//   //       const response = await axios.post("http://localhost:8000/user/get-user",{uid:userData.uid})
//   //       if(response.status=201) {
//   //         dispatch(setUserData(response.data));
//   //       }
//   //     } catch(err) {
//   //       console.log(err);
//   //     }
//   //   }

//   //   getUser();
//   },[update])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     console.log(formData);

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/user/update-profile`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       if (response.status === 201) {

//         if (response.data.message === "Existed!") {
//           openNotificationWithIcon("error", "User with same phone number or email already existed");
//         } else {
//           userData = response.data.user;
//           dispatch(setUserData(userData));
//           if (response.data.message !== "updated") {
//             openNotificationWithIcon("error", "Password not matched rest fields are updated!");
//           } else {
//             openNotificationWithIcon("success", "Profile Updated Successfully!");
//           }

//         }
//         setUpdate(!update)

//       } else {
//         openNotificationWithIcon("error", "Please Try Again");
//       }
//     } catch (err) {
//       console.error("Error submitting form data:", err);
//     }
//     // handleCancel();
//     // e.target.password.value = "";
//     // e.target?.newPassword?.value = "";
//   };

//   const handleChange = (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImg((prevImg) => ({
//           ...prevImg,
//           [name]: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleValues = (e) => {
//     setValues(e.target.value);
//   };

//   return (
//     <div className="updateProfile">
//       {contextHolder}
//       <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//         {display}
//       </h2>

//       <form
//         className="updateProfileContainer"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <div className="profileLeftBlock">
//           <div className="profileImg">
//             <label htmlFor="image1">
//               <img src={img?.image1} alt="#" />
//               <p>Profile Image</p>
//             </label>
//             <input
//               onChange={handleChange}
//               id="image1"
//               type="file"
//               name="image1"
//               accept="image/*"
//             />
//           </div>
//           {userData.role !== "Customer" ?
//             <div className="logo">
//               <label htmlFor="image2">
//                 <img src={img.image2} alt="#" />
//                 <p>Business Logo</p>
//               </label>
//               <input
//                 onChange={handleChange}
//                 id="image2"
//                 type="file"
//                 name="image2"
//                 accept="image/*"
//               />
//             </div> : <div className="logo">
//               <label>
//                 <img src={img.image2} alt="#" />
//               </label>
//             </div>
//           }
//         </div>

//         <div className="profileRightBlock">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={values?.name}
//             onChange={handleValues}
//             pattern="^\S+.*$"

//           />
//           <label>Email</label>

//           {userData?.email !== "NA" ? (
//             <input
//               type="email"
//               name="email"
//               value={values?.email}
//               onChange={handleValues}
//               pattern="^\S+.*$"

//               disabled
//             />
//           ) : (
//             <input
//               type="email"
//               name="email"
//               value={values?.email}
//               pattern="^\S+.*$"
//               onChange={handleValues}
//             />
//           )}

//           <input
//             type="text"
//             name="uid"
//             value={userData.uid}
//             style={{ display: "none" }}
//             pattern="^\S+.*$"

//           />

//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={values?.phone}
//             onChange={handleValues}
//             pattern="^\S+.*$"

//           />

//           {userData?.password === "NA" && <> <label>Set Password</label>
//             <input
//               type="password"
//               name="password"
//               value={values?.password}
//               onChange={handleValues}
//               pattern="^\S+.*$"

//             />
//           </>}

//           {userData?.password !== "NA" && <> <label>Set Password</label>
//             <input
//               type="password"
//               name="password"
//               value={values?.password}
//               onChange={handleValues}
//               placeholder="Old Password"
//               pattern="^\S+.*$"

//             />

//             <input
//               type="password"
//               name="newPassword"
//               value={values?.password}
//               onChange={handleValues}
//               placeholder="New Password"
//               pattern="^\S+.*$"

//             />
//           </>}

//           {userData.role !== "Customer" && (
//             <>
//               <label>Business name</label>
//               <input
//                 type="text"
//                 name="bName"
//                 value={values?.bName}
//                 onChange={handleValues}
//                 pattern="^\S+.*$"

//               />
//               <label>Business type</label>
//               <input
//                 type="text"
//                 name="bType"
//                 value={values?.bType}
//                 onChange={handleValues}
//                 pattern="^\S+.*$"

//               />

//               <label>GST Number</label>
//               <input
//                 type="text"
//                 name="gNo"
//                 value={values?.gNo}
//                 onChange={handleValues}
//                 pattern="^\S+.*$"

//               />
//             </>
//           )}

//           <button className=".button">Update</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
