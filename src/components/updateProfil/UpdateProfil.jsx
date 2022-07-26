import React, { useState } from 'react';
import UpLoadImg from './UploadImg';
import { useSelector } from 'react-redux';

const UpdateProfil = () => {
  const profilPic = useSelector((state) => state.user.img);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);

  const [inputsValue, setInputsValue] = useState({});

  const handleChange = (event) => {
    if (event.target.name.match('file')) {
      // when input profile picture

      setInputsValue((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.files[0],
      }));
    } else {
      // when input text values
      setInputsValue((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <div className="profil-container">
      <div className="update-container">
        <div className="formContainer">
          <h1>{username}</h1>
          <img
            src={inputsValue.file ? URL.createObjectURL(inputsValue.file) : profilPic}
            alt=""
          />
          <UpLoadImg
            inputsValue={inputsValue}
            handleChange={handleChange}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
