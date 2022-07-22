import React, { useContext, useEffect, useState } from 'react';
import './productInputs.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import {
  sizeSelection,
  typeSelection,
  productInputs,
} from '../../../../formSource';
import { WinesContext } from '../../../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest ,publicRequest} from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const ProductInputs = ({ selection }) => {
  const { isLoading, setIsLoading } = useContext(WinesContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    title: '',
    desc: '',
    vintage: '',
    price: selection.price,
    quantity: selection.quantity,
    country: '',
    type: '',
    size: '',
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (e.target.name === 'type' || e.target.name === 'size') {
      setInputsValue((prevState) => ({ ...prevState, [name]: value }));
    }

    setInputsValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    const { title, desc, vintage, price, quantity, country, type, size } =
      inputsValue;
    data.append('title', title);
    data.append('desc', desc);
    data.append('vintage', vintage);
    data.append('quantity', quantity);
    data.append('country', country);
    data.append('price', price);
    data.append('size', size);
    data.append('type', type);

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
    }else{
      data.append('img', selection.img);

    }

    try {
      await publicRequest
        .post(`/products/update/${selection._id}`, data)
        .then(() => {
          setIsLoading(false);
          Swal.fire({
            title: `wine  is updated`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });

          navigate('/products');
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

  useEffect(() => [inputsValue, isLoading,selection]);

  return (
    <div className="productInputs">
      <div className="productInputsContainer">
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

              {productInputs.map((input, index) => (
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
              <div className="formInput">
                <label>Type</label>
                <select
                  defaultValue={'DEFAULT'}
                  name="type"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="DEFAULT" disabled>
                    Choose wine type
                  </option>
                  {typeSelection.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <label>Content</label>
                <select
                  defaultValue={'DEFAULT'}
                  name="size"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="DEFAULT" disabled>
                    Choose content
                  </option>
                  {sizeSelection.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

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

export default ProductInputs;
