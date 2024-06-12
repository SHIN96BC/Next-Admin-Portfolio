'use client'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs';
import Button from "@mui/material/Button";
import DateRange, {DateRangeProps} from "@Src/components/common/date/DateRange";
import {FormattedMessage} from "react-intl";


export default function SearchDate({ startDate, endDate, handleStartDate, handleEndDate }: DateRangeProps){

  const handleToday = () => {
    handleStartDate(dayjs());
    handleEndDate(dayjs());
  };

  const handleWeek = () => {
    handleStartDate(dayjs());
    handleEndDate(dayjs().add(7, 'day'));
  };

  const handleMonth = () => {
    handleStartDate(dayjs());
    handleEndDate(dayjs().add(30, 'day'));
  };

  const handleTotal = () => {
    handleStartDate(dayjs().startOf('years'));
    handleEndDate(dayjs().add(1, 'years').endOf('years'));
  };

  return (
    <Box>
      <Typography variant="h5">
        <FormattedMessage id="productList.search.regDate.title" />
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} pr={2}>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
          />

          {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
          {/*  <DemoContainer components={['DatePicker', 'DatePicker']}>*/}
          {/*    <DatePicker*/}
          {/*      sx={{width: '100%'}}*/}
          {/*      // label="Uncontrolled picker"*/}
          {/*      maxDate={endDate ? endDate : undefined}*/}
          {/*      value={startDate}*/}
          {/*      onChange={handleStartDate}*/}
          {/*    />*/}
          {/*    <DatePicker*/}
          {/*      sx={{width: '100%'}}*/}
          {/*      // label="Controlled picker"*/}
          {/*      minDate={startDate ? startDate : undefined}*/}
          {/*      value={endDate}*/}
          {/*      onChange={handleEndDate}*/}
          {/*    />*/}

          {/*  </DemoContainer>*/}
          {/*</LocalizationProvider>*/}
        </Grid>
        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} display="flex" alignItems="center" pt={1}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={handleToday}
              >
                <FormattedMessage id="productList.search.regDate.button.today" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={handleWeek}
              >
                <FormattedMessage id="productList.search.regDate.button.week" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={handleMonth}
              >
                <FormattedMessage id="productList.search.regDate.button.month" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={handleTotal}
              >
                <FormattedMessage id="productList.search.regDate.button.total" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}