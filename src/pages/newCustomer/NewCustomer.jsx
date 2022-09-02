import React, { useContext, useState } from 'react';
import './newCustomer.scss';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest } from '../../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewCustomer = ({ inputs, name }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
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

        const { customerName, email, adress, country, phone } = inputsValue;
        const data = { customerName, email, adress, country, phone };

        userRequest
          .post(`/customers/new/${userId}`, data)
          .then(() => {
            Swal.fire({
              title: `Customer registered`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
            setIsLoading(false);
            navigate('/customers');
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <div className="newCustomer">
      <div className="newCustomerContainer">
        <div className="top">
          <h1>{name}</h1>
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

export default NewCustomer;
