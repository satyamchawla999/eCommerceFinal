import React, { useEffect, useState } from "react";
import "../../assets/styles/adminChat.scss";
import { useSelector } from "react-redux";
import { Chat } from "../subComponents";
import { getUserImages } from "../../Utils/constant";
import { getChatUsersFromDB } from "../../Utils/service";

const AdminChat = () => {
  const [display, setDisplay] = useState("Profile");
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState("");
  const [data, setData] = useState({});

  const userData = useSelector((state) => state.userData);
  const [img, setImg] = useState(getUserImages(userData));

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const response = await getChatUsersFromDB() 
        if (response.status === 201) {
          setUsers(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getChatUsers();
  }, [display]);

  const handleDisplay = (value, uid, name, image) => {
    setDisplay(value);
    setUid(uid);
    setData({ uid, name, image });
  };

  return (
    <div className="adminChat">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={img?.image1} />
          <p>
            {userData?.name}
            <br />
            {userData?.role}
          </p>
        </div>

        {users.map((user) => {
          const image = getUserImages({ imgUrl: user?.imgUrl }).image1;
          return (
            <div
              className={`customerInfoItems ${
                display === user?.cName && "toggel"
              }`}
              onClick={() =>
                handleDisplay("Profile", user.cUid, user.cName, image)
              }
            >
              <img src={image} alt="" />

              <div>
                <p>{user?.cName}</p>
                <p style={{ fontSize: "12px" }}>{user?.USERID}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chatSection">
        {uid !== "" && <Chat uid={uid} data={data} />}
      </div>
    </div>
  );
};

export default AdminChat;
