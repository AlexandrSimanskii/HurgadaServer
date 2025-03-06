import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectFilter = ({ title, state, setState, array, setSlider }) => {
  const handleChange = (event) => {
    if (title === "Категория") {
      setSlider([0, 50000]);
    }
    setState(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="catalog__aside-slect">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label={title}
          onChange={handleChange}
        >
          <MenuItem value={title === "Сортировать" ? "rating_asc" : "false"}>
            По умолчанию
          </MenuItem>

          {array.map((item) => (
            <MenuItem key={item} value={item}>
              {item === "price_asc"
                ? "по возрастанию цены"
                : item === "price_desc"
                ? "по убыванию цены"
                : item === "rating_desc"
                ? "по популярности"
                : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectFilter;
