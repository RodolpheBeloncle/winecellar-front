import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = ({ data, searchText, setSearchText }) => {
  useEffect(() => {
    console.log('searchText', searchText);
  }, [searchText]);

  return (
    <div style={{ display: 'flex' }}>
      <Autocomplete
        id="combo-box-demo"
        options={data}
        defaultValue={searchText}
        getOptionLabel={(option) => (option.customer ? option.customer : '')}
        style={{ width: 300}}
        value={searchText}
        onChange={(_event, newQuery) => {
          setSearchText(newQuery.customer);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer Order"
            variant="outlined"
            onClick={() => setSearchText('')}
          />
        )}
      />
    </div>
  );
};

export default Search;
