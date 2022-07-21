import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfil } from '../../redux/apiCalls';

const UploadImg = ({
  inputUserName,
  setInputUserName,
  file,
  setFile,
  userId,
}) => {
  const dispatch = useDispatch();

  const handleUpdateProfil = async (e) => {
    e.preventDefault();

    // necessary built object packages to send data pic
    const form = new FormData();

    form.append('username', inputUserName);
    if (file) {
      try {
        form.append('img', file);
      } catch (err) {
        alert(`something went wrong with this file`);
      }
    }
    updateProfil(dispatch, userId, form);
  };

  useEffect(() => {
    console.log(inputUserName, file);
  }, [file, inputUserName]);

  return (
    <form action="" onSubmit={(e) => handleUpdateProfil(e)}>
      <div className="inputs-container">
        <div className="input-content">
          <label htmlFor="file">Change Profil Image</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="input-content">
          <input
            type="text"
            name="username"
            placeholder={inputUserName}
            onChange={(e) => {
              setInputUserName(e.target.value);
            }}
          />
        </div>
        <div className="input-content">
          <input type="submit" value="Update" />
        </div>
      </div>
    </form>
  );
};

export default UploadImg;
