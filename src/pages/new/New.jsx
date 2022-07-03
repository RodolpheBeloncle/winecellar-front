import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { sizeSelection, typeSelection } from '../../formSource';
import { useState } from 'react';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [inputsValue, setInputsValue] = useState({
    title: '',
    description: '',
    vintage: '',
    price: '',
    quantity: '',
    type: '',
    size: '',
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputsValue((prevState) => ({ ...prevState, [name]: value }));
    console.log(inputsValue);
  };

  return (
    <div className="new">
      <div className="newContainer">
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
                  name="type"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {typeSelection.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <label>Content</label>
                <select
                  name="size"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {sizeSelection.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
