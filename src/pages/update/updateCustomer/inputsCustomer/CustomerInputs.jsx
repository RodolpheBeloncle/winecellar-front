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
  const [file, setFile] = useState(null);
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

    try {
      if (file) {
        try {
          data.append('img', file);
        } catch (err) {
          setIsLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong with the file`,
          });
        }
      } 

      await userRequest
        .post(`/customers/update/${selection._id}`, data)
        .then(() => {
          setIsLoading(false);
          Swal.fire({
            title: `Customer is updated`,
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
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong!${err}`,
      });
    }
  };

  useEffect(() => {console.log(file)},[inputsValue, isLoading, selection,file]);

  return (
    <div className="customerInputs">
      <div className="customerInputsContainer">
        <div className="top">
          <h1>Update {selection.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : selection.img}
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
