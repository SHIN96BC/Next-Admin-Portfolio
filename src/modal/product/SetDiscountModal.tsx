'use client'

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useCallback, useEffect, useState} from "react";
import {SetDiscount} from "@Src/types/discount";
import MainCard from "@Src/components/common/cards/MainCard";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  SelectChangeEvent
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CommonSelectBox, {SelectOptionType} from "@Src/components/select/CommonSelectBox";
import {BLUE_COLOR} from "@Src/constants/color";
import DateRange, {DateRangeProps} from "@Src/components/common/date/DateRange";
import {DISCOUNT_PROMOTION_TYPE_DATE_VALUE, DISCOUNT_PROMOTION_TYPE_LONG_VALUE} from "@Src/constants/product/add";
import {FormattedMessage} from "react-intl";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #46B6C2',
  // boxShadow: 24,
  p: 1,
};

interface Props extends DateRangeProps {
  isOpen: boolean;
  promotionTypeOptions: SelectOptionType[];
  handleOk: (args: SetDiscount) => void;
  handleCancel: () => void;
};

export default function SetDiscountModal(
  {
    isOpen,
    promotionTypeOptions,
    handleOk,
    handleCancel,
    startDate,
    endDate,
    handleStartDate,
    handleEndDate,
  }: Props
) {
  const [open, setOpen] = useState<boolean>(false);

  const [discount, setDiscount] = useState<string>('');
  const [promotionType, setPromotionType] = useState<string>('');

  const handleClick = () => {
    if (handleOk)
      handleOk({
        discount: '',
        promotionType: DISCOUNT_PROMOTION_TYPE_LONG_VALUE,
        promotionStartDate: '',
        promotionEndDate: '',
      });

    setOpen(false);
  };

  const handleClose = () => {
    if (handleCancel)
      handleCancel();

    setOpen(false);
  };

  const handleChangePromotionType = useCallback((event: SelectChangeEvent) => {
    setPromotionType(event.target.value);
  }, [setPromotionType]);

  useEffect(() => {
    if (isOpen) {
      if (Array.isArray(promotionTypeOptions) && promotionTypeOptions.length > 0) {
        setPromotionType(promotionTypeOptions[0].value);
      }

      setOpen(true);
    }
  }, [isOpen]);

  return (
    <Modal open={open}>
      <Box sx={style}>
        <MainCard>
          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
                <Typography variant="h5" pr={2}>
                  <FormattedMessage id="productAdd.priceStock.discount.modal.discount" />
                </Typography>

                <Box display="flex" alignItems="center">
                  <TextField
                    id="outlined-basic-additional"
                    sx={{
                      minWidth: 300,
                      '& input': {
                        textAlign: 'right',
                      },
                    }}
                    InputProps={{
                      startAdornment:
                        <InputAdornment
                          position="start"
                          sx={{
                            '& p': {
                              color: '#000000'
                            },
                          }}>₱</InputAdornment>,
                    }}
                  />

                  <Typography pl={2}>
                    <FormattedMessage id="productAdd.priceStock.discount.modal.discount" />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
                <Typography variant="h5">
                  <FormattedMessage id="productAdd.priceStock.discount.modal.promotionDate.title" />
                </Typography>

                <Box>
                  <CommonSelectBox
                    isLocales
                    minWidth={300}
                    value={promotionType}
                    options={promotionTypeOptions}
                    handleChange={handleChangePromotionType}
                  />
                </Box>
                {
                  promotionType === DISCOUNT_PROMOTION_TYPE_DATE_VALUE &&
                    <Box>
                      <DateRange
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDate={handleStartDate}
                        handleEndDate={handleEndDate}
                      />
                    </Box>
                }
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
                <Divider />
                <Box display="flex" alignItems="center" justifyContent="end">
                  <Typography width={'80%'} variant="h5" pt={2} textAlign="right" pr={2}>
                    <FormattedMessage id="productAdd.priceStock.discount.modal.specialPrice" />
                  </Typography>
                  <Typography width={'20%'} variant="h5" pt={2} color={BLUE_COLOR}>
                    ₱ 800
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box width="100%" display="flex" justifyContent="end">
                  <Box pr={2}>
                    <Button variant="contained" onClick={handleClose}>
                      <FormattedMessage id="common.state.cancel" />
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={handleClick}>
                      <FormattedMessage id="common.state.ok" />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      </Box>
    </Modal>
  );
}