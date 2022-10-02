import React, { useContext, useState } from 'react';
import './customerInputs.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { WinesContext } from '../../../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { customerInputs } from '../../../../formSource';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest,publicRequest } from '../../../../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emptyCustomer from '../../../../img/emptyCustomer.png';

const CustomerInputs = ({ selection }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const userId = useSelector((state)=> state.user.userId)
  const publicId = useSelector((state) => state.user.publicId);
  const { isLoading, setIsLoading,setCustomersList } = useContext(WinesContext);
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

  const getCustomerData = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get(`/customers/${userId}`);
      setCustomersList(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (!result.isConfirmed && result.isDismissed) {
        setIsLoading(false);
        return;
      } else if (result.isConfirmed) {
        if (file !== null) {
          const inputFile = document.getElementById('file');
          const fileData = new FormData();
          fileData.append('img', inputFile?.files?.item(0));
          fileData.append('publicId', publicId);
          userRequest
            .put(`/customers/uploadFile/${selection._id}`, fileData)
            .then((response) => {
              getCustomerData()
              setIsLoading(false);
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!${err}`,
              });
            });
        }
        try {
          const { customerName, email, adress, country, phone } = inputsValue;
          const data = { customerName, email, adress, country, phone };
          userRequest
            .put(`/customers/update/${selection._id}`, data)
            .then(() => {
              Swal.fire({
                title: `Customer has been updated`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp',
                },
              });
            })
            .then(() => {
              setIsLoading(false);
              navigate('/customers');
            })
            .catch((err) => {
              setIsLoading(false);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!${err}`,
              });
            });
        } catch (err) {}
      }
    });
  };

  return (
    <div className="customerInputs">
      <div className="customerInputsContainer">
        <div className="top">
          <h1>Update {selection.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : selection.img === 'NC'
                  ? emptyCustomer
                  : selection.img
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
                <button onClick={(e) => handleSubmit(e)}>update</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInputs;
