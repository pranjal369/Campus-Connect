import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { updateUser } from "../../../../Server/Controllers/UserController";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
// import { uploadImage } from "../../api/UploadRequest";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const { passward, ...other } = data;
  const [formData, setFormData] = useState(other)

  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()

  const { user } = useSelector((state) => state.authReducer.authData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img)

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName)
      data.append("file", profileImage)
      UserData.profilePicture = fileName
      // console.log(newPost);
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }


    }

    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName)
      data.append("file", coverImage)
      UserData.coverPicture = fileName
      // console.log(newPost);
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }

    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false)
  }


  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" >
        <h3>Your Info</h3>
        <div>
          <input
            // value={formData.firstname}
            // onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            // value={formData.lastname}
            // onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            // value={formData.worksAt}
            // onChange={handleChange}
            type="text"
            placeholder="Works/Study at"
            name="worksAt"
            className="infoInput"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            // value={formData.livesIn}
            // onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesin"
            className="infoInput"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            // value={formData.country}
            // onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            // value={formData.relationship}
            // onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Current Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          <input
            // value={formData.relationship}
            // onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Years of Experience"
            name="exp"
            onChange={handleChange}
            value={formData.exp}
          />
        </div>
        <div>
          <input
            // value={formData.relationship}
            // onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Worked on Technology"
            name="worked"
            onChange={handleChange}
            value={formData.worked}
          />
        </div>
        <div>
          <input
            // value={formData.relationship}
            // onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Graduation Year"
            name="year"
            onChange={handleChange}
            value={formData.year}
          />
        </div>
        <div>
          <input
            // value={formData.relationship}
            // onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Previous Company"
            name="prev_companies"
            onChange={handleChange}
            value={formData.prev_companies}
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage"  onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="button infoButton" type="submit" onClick={handleSubmit} >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;