import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import RequiredMark from "@Src/components/common/RequiredMark";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import TextField from "@mui/material/TextField";
import MainCard from "@Src/components/common/cards/MainCard";
import {REQUIRED_COLOR} from "@Src/constants/color";
import {Control, Controller} from "react-hook-form";
import {EnterOptionListData} from "@Src/validation/schema/product/add";

type Props = {
  index: number;
  control: Control<any>;
  controlName: {
    name: string,
    value: string
  };
  rowCount: number;
  maxCount: number;
  nameErrorMessage?: string;
  valueErrorMessage?: string;
  handleAddOption?: () => void;
  handleRemoveOption?: (index: number) => void;
  handleMoveOption?: (from: number, to: number) => void;
};

export default function EnterOptionForm(
  {
    index,
    control,
    controlName,
    rowCount,
    maxCount,
    nameErrorMessage,
    valueErrorMessage,
    handleAddOption,
    handleRemoveOption,
    handleMoveOption
  }: Props) {
  return (
    <MainCard sx={{"& .MuiCardContent-root" : { padding: 1 }}}>
      <Grid container spacing={1}>
        {
          handleMoveOption &&
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                {/*<Button variant="contained" sx={{ minWidth: 0, p: 1 }}>*/}
                <Button variant="contained" sx={{ minWidth: 0, p: 1 }} disabled={(rowCount < 2)} onClick={() => handleMoveOption(index, index - 1 < 0 ? rowCount -1 : index - 1)}>
                  <ArrowUpwardOutlinedIcon />
                </Button>
                <Button variant="contained" sx={{ minWidth: 0, p: 1, ml: 1 }} disabled={(rowCount < 2)} onClick={() => handleMoveOption(index, index + 1 > rowCount - 1 ? 0 : index + 1)}>
                  <ArrowDownwardOutlinedIcon />
                </Button>


                {/*{*/}
                {/*  (index >= 0 && index < rowCount - 1) &&*/}
                {/*  <Button variant="contained" sx={{ minWidth: 0, p: 1 }} disabled={(rowCount < 2)} onClick={() => handleMoveOption(index, index + 1)}>*/}
                {/*    <ArrowDownwardOutlinedIcon />*/}
                {/*  </Button>*/}
                {/*}*/}
                {/*{*/}
                {/*  (index > 0 && index <= rowCount - 1) &&*/}
                {/*  <Button variant="contained" sx={{ minWidth: 0, p: 1 }} onClick={() => handleMoveOption(index, index - 1)}>*/}
                {/*    <ArrowUpwardOutlinedIcon />*/}
                {/*  </Button>*/}
                {/*}*/}
                {/*</Button>*/}
              </Box>
            </Grid>
        }
        <Grid item xs={4.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <Controller
            name={controlName.name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="option-name"
              />
            )}
          />
          {nameErrorMessage &&
            <Typography variant="caption" color={REQUIRED_COLOR}>
              <FormattedMessage id={nameErrorMessage} />
            </Typography>
          }
        </Grid>
        <Grid item xs={4.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
          <Controller
            name={controlName.value}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="option-value"
              />
            )}
          />
          {valueErrorMessage &&
            <Typography variant="caption" color={REQUIRED_COLOR}>
              <FormattedMessage id={valueErrorMessage} />
            </Typography>
          }
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            {
              (index === 0 && rowCount < maxCount) ?
                <Box display="flex" alignItems="center" justifyContent="center">
                  {handleAddOption &&
                    <Button variant="contained" sx={{ minWidth: 0, p: 1 }} onClick={handleAddOption}>
                      <AddOutlinedIcon />
                    </Button>
                  }
                </Box>
                :
                <Box display="flex" alignItems="center" justifyContent="center">
                  {handleRemoveOption &&
                    <Button variant="contained" sx={{ minWidth: 0, p: 1 }} onClick={() => handleRemoveOption(index)}>
                      <RemoveOutlinedIcon />
                    </Button>
                  }
                </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}