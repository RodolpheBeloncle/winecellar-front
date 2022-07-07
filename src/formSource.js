export const userInputs = [
  {
    id: 1,
    label: 'Username',
    type: 'text',
    placeholder: 'john_doe',
  },
  {
    id: 2,
    label: 'Name and surname',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    id: 3,
    label: 'Email',
    type: 'mail',
    placeholder: 'john_doe@gmail.com',
  },
  {
    id: 4,
    label: 'Phone',
    type: 'text',
    placeholder: '+1 234 567 89',
  },
  {
    id: 5,
    label: 'Password',
    type: 'password',
  },
  {
    id: 6,
    label: 'Address',
    type: 'text',
    placeholder: 'Elton St. 216 NewYork',
  },
  {
    id: 7,
    label: 'Country',
    type: 'text',
    placeholder: 'USA',
  },
];

export const productInputs = [
  {
    id: 1,
    label: 'Title',
    type: 'text',
    placeholder: 'estate name',
  },
  {
    id: 2,
    label: 'Description',
    type: 'text',
    placeholder: 'description',
  },
  {
    id: 3,
    label: 'Vintage',
    type: 'text',
    placeholder: 'vintage',
  },
  {
    id: 4,
    label: 'Price',
    type: 'number',
    placeholder: 100,
  },
  {
    id: 5,
    label: 'Quantity',
    type: 'number',
    placeholder: 0,
  },
  {
    id: 6,
    label: 'Country',
    type: 'text',
    placeholder: 'country',
  },
];

export const orderInputs = [
  {
    userId: '',
    customer: '',
    products:'',
    paymentMethod: '',
    amount: 0,
    address: '',
   
  },
];

export const typeSelection = [
  {
    label: 'White',
    value: 'white',
  },
  {
    label: 'Rosé',
    value: 'rosé',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Sweet',
    value: 'sweet',
  },
  {
    label: 'Sparkling',
    value: 'sparkling',
  },
  {
    label: 'Brandy',
    value: 'brandy',
  },
  {
    label: 'VDL / VDN',
    value: 'vdl / vdn',
  },
];

export const sizeSelection = [
  {
    label: '1/2 Bottle',
    value: '150cl',
  },
  {
    label: 'Bottle',
    value: '75cl',
  },
  {
    label: 'Magnum',
    value: '150cl',
  },
  {
    label: 'Dbl Magnum',
    value: '300cl',
  },
  {
    label: 'Jéroboam',
    value: '500cl',
  },
];
