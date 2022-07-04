import './newProduct.scss';
import { useState, useEffect } from 'react';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { sizeSelection, typeSelection } from '../../formSource';
import { userRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const NewProduct = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
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
        alert(`something went wrong with this file`);
      }
    }

    try {
      await userRequest.post(`/products/`, data).then(({ data }) => {
        console.log('response', data);
        alert(`your ${inputsValue.title} is in stock`);

        navigate('/products');
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    console.log('inputField', inputsValue);
  }, [inputsValue]);

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
              <button onClick={(e) => handleSubmit(e)}>create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
