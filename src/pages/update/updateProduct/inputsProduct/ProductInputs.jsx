import React, { useContext, useState } from 'react';
import './productInputs.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import {
  sizeSelection,
  typeSelection,
  productInputs,
} from '../../../../formSource';
import { WinesContext } from '../../../../wineContext/WinesContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import emptyBottle from '../../../../img/emptyBottle.png';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { userRequest ,publicRequest} from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '10px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  item: {
    padding: '25px',
  },
}));

const ProductInputs = ({ selection }) => {
  const classes = useStyles();
  const { isLoading, setIsLoading ,setWineData} = useContext(WinesContext);
  const userId = useSelector((state)=> state.user.userId)
  const publicId = useSelector((state) => state.user.publicId);
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

  const getWineData = async () => {
    try {
      const res = await publicRequest.get(`/products/${userId}`);
      setWineData(res.data);
    } catch (e) {
      console.log(e);
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
            .put(`/products/uploadFile/${selection._id}`, fileData)
            .then((response) => {
              getWineData()
              console.log(response);
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
            .put(`/products/update/${selection._id}`, data)
            .then(() => {
              Swal.fire({
                title: `Product has been updated`,
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
              navigate('/products');
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
    <div className="productInputs">
      <div className="productInputsContainer">
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
                  ? emptyBottle
                  : selection.img
              }
              alt=""
            />
          </div>
          <Grid container className={classes.item} direction="row">
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    defaultValue={file}
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>

                {productInputs.map((input, index) => (
                  <div key={input.id} className="formInput">
                    <label>{input.label}</label>
                    <input
                      key={index}
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
                      wine type
                    </option>
                    {typeSelection.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
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
                      content type
                    </option>
                    {sizeSelection.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {isLoading ? (
                  <Box>
                    <CircularProgress />
                  </Box>
                ) : (
                  <button onClick={(e) => handleSubmit(e)}>update</button>
                )}
              </form>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProductInputs;
