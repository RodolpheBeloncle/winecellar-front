import React, { useContext, useState } from 'react';
import './newProduct.scss';
import { sizeSelection, typeSelection } from '../../formSource';
import { useSelector } from 'react-redux';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const NewProduct = ({ inputs, title }) => {
  const { isLoading, setIsLoading } = useContext(WinesContext);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    title: '',
    desc: '',
    vintage: '',
    price: 0,
    quantity: 0,
    country: '',
    type: '',
    content: '',
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
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (!result.isConfirmed && result.isDismissed) {
        setIsLoading(false);
        return;
      } else if (result.isConfirmed) {
        setIsLoading(true);

        const { title, desc, vintage, price, quantity, country, type, content } =
          inputsValue;
        const data = {
          title,
          desc,
          vintage,
          price,
          quantity,
          country,
          type,
          content,
        };

        userRequest
          .post(`/products/new/${userId}`, data)
          .then(() => {
            Swal.fire({
              title: `Product added to stock`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
            setIsLoading(false);
            navigate('/products');
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
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
