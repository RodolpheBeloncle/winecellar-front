import React, { useState, useEffect } from 'react';
// import { publicRequest } from '../../utils/api';
import { publicRequest } from '../../utils/api';
import { saveAs } from 'file-saver';

const Invoice = () => {
  const [inputs, setInputs] = useState({
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  });

  const handleChange = ({ target: { value, name } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const createAndDownloadPdf = () => {
    publicRequest
      .post('/create-pdf', inputs)
      .then(() => publicRequest.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        // set the id in newly created invoce
        saveAs(pdfBlob, 'newInvoice.pdf');
      });
  };

  useEffect(() => {
    console.log(inputs);
  });

  return (
    <div className="invoice-document">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="Number"
        placeholder="Receipt ID"
        name="receiptId"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onChange={handleChange}
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default Invoice;
