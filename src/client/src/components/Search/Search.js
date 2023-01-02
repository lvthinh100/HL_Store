import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  Box,
  IconButton,
  Popover,
  TextField,
  Typography,
  Stack,
  CardMedia,
} from "@mui/material";
import { debounce } from "lodash";

import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { searchProduct } from "../../api";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const DebounceSelect = function ({ fetchOptions, debounceTimeout, ...props }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setLoading(true);

      fetchOptions(value).then((newOptions) => {
        setOptions([...newOptions]);
        setLoading(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Autocomplete
      {...props}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name}
      onInputChange={(e, newValue) => {
        if (e.type === "change") {
          debounceFetcher(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ minWidth: "400px" }}
          placeholder="Search your product here"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          onClick={() => navigate(`/product/${option._id}`)}
        >
          <Stack direction="row">
            <CardMedia
              height="80px"
              alt="model"
              component="img"
              src={`${SERVER_URL.PRODUCT_IMAGE}/${option.image}`}
              sx={{ objectFit: "scale-down" }}
            />
            <Stack direction="column">
              <Typography fontWeight="bold"> {option.name} </Typography>
              <Typography> {option.price.toLocaleString()}d </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    />
  );
};

export default function Search() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchProductSearch = async (key) => {
    if (key === "") return [];
    const { data } = await searchProduct(key);

    return [...data.data];
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <SearchIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <DebounceSelect
          fetchOptions={fetchProductSearch}
          debounceTimeout={300}
        />
      </Popover>
    </Box>
  );
}
