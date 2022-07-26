import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './uploadImg.scss';
import { updateProfil } from '../../redux/apiCalls';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { userRequest } from '../../utils/api';

const UploadImg = ({ inputsValue, handleChange, userId }) => {
  const dispatch = useDispatch();
  const { isLoading, setIsLoading, errorMessage, setErrorMessage } =
    useContext(WinesContext);

  const handleUpdateProfil = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // necessary built object packages to send data pic
    //   Optional code to simulate delay

    const form = new FormData();
    form.append('username', inputsValue.username);
    if (inputsValue.file) {
      try {
        form.append('img', inputsValue.file);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Something went wrong!${err}`,
          // footer: `<a href="">Why do I have this issue?</a>`
        });
        // s('Oops!', 'Something went wrong!', `${errorMessage}`);
      }
    }
    try {
      await userRequest
        .post(`/users/updateProfil/${userId}`, form)
        .then((response) => {
          updateProfil(dispatch, response.data);
        })
        .then(() => {
          setIsLoading(false);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profil have been updated',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          setErrorMessage('Unable to update profil');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorMessage}`,
            // footer: '<a href="">Why do I have this issue?</a>',
          });
          setIsLoading(false);
        });
    } catch (err) {
      setErrorMessage('Unable to update profil');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${errorMessage}`,
        // footer: '<a href="">Why do I have this issue?</a>',
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('isfetching', isLoading);
    console.log(inputsValue);
  }, [inputsValue, isLoading]);

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
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-content">
          <input
            type="text"
            name="username"
            placeholder={inputsValue.username}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="input-content">
          {isLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <input type="submit" value="Update" />
          )}
        </div>
      </div>
    </form>
  );
};

export default UploadImg;
