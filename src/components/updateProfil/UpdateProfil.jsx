import React, { useState } from 'react';
import UpLoadImg from './UploadImg';
import { useSelector } from 'react-redux';

const UpdateProfil = () => {
  const [file, setFile] = useState('');
  const profilPic = useSelector((state) => state.user.img);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);
  const [inputUserName, setInputUserName] = useState(username);
  
  return (
    <div className="profil-container">
      <div className="update-container">
        <div className="formContainer">
          <h1>{username}</h1>
          <img
            src={file ? URL.createObjectURL(file) : profilPic}
            alt=""
          />
          <UpLoadImg
            file={file}
            setFile={setFile}
            inputUserName={inputUserName}
            setInputUserName={setInputUserName}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
