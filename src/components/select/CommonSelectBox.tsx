import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {FormattedMessage} from "react-intl";

export type SelectOptionType = {
  value: string;
  label: string;
}

interface Props {
  isFullWidth?: boolean;
  isLocales?: boolean;
  minWidth?: number;
  value: string;
  options: SelectOptionType[];
  handleChange: (event: SelectChangeEvent<string>) => void;
}

export default function CommonSelectBox({isFullWidth, isLocales, minWidth, value, options, handleChange}: Props) {
  return (
    <FormControl fullWidth={isFullWidth}>
      {/*<InputLabel id="demo-simple-select-label">Select Age</InputLabel>*/}
      <Select
        value={value}
        onChange={handleChange}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{
          minWidth,
        }}
      >
        {
          Array.isArray(options) && options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                { isLocales ? <FormattedMessage id={option.label} /> : option.label }
              </MenuItem>
            );
          })
        }
      </Select>
    </FormControl>
  );
}