import React, { useContext, useEffect, useState } from 'react';
import './newProduct.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { sizeSelection, typeSelection } from '../../formSource';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const NewProduct = ({ inputs, title }) => {
  const { isLoading, setIsLoading } = useContext(WinesContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    title: '',
    desc: '',
    vintage: '',
    price: 0,
    quantity: 0,
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
    }

    try {
      await userRequest.post(`/products/new`, data).then(() => {
        setIsLoading(false);
        Swal.fire({
          title: `wine is recorded`,
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
        text: `Please provide a wine picture !`,
      });
    }
  };

  useEffect(() => [inputsValue, isLoading]);

  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <div className="top">
          <h1>{title}</h1>
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

              {inputs.map((input, index) => (
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

export default NewProduct;
