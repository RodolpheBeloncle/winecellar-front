import React, { useContext, useEffect, useState } from 'react';
import './customerInputs.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { WinesContext } from '../../../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { customerInputs } from '../../../../formSource';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest } from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CustomerInputs = ({ selection }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const { isLoading, setIsLoading } = useContext(WinesContext);
  const [inputsValue, setInputsValue] = useState({
    customerName: '',
    email: '',
    phone: '',
    adress: '',
    country: '',
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputsValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();

    const { customerName, email, adress, country, phone } = inputsValue;
    data.append('customerName', customerName);
    data.append('email', email);
    data.append('adress', adress);
    data.append('phone', phone);
    data.append('country', country);

    if (file) {
      try {
        data.append('img', file);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Something went wrong with the file`,
        });
      }
    }

    try {
      await userRequest.post(`/customers/new`, data).then(() => {
        setIsLoading(false);
        Swal.fire({
          title: `Customer ${customerName} is recorded`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
        navigate('/customers');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong!${err}`,
      });
    }
  };

  useEffect(() => [inputsValue, isLoading]);

  return (
    <div className="customerInputs">
      <div className="customerInputsContainer">
        <div className="top">
          <h1>Update {selection}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {customerInputs.map((input, index) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={Object.keys(inputsValue)[index]}
                    value={Object.values(inputsValue)[index]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              ))}

              {isLoading ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                <button onClick={(e) => handleSubmit(e)}>create</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInputs;
