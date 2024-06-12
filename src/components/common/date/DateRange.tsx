import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";

export interface DateRangeProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  handleStartDate: (newValue: dayjs.Dayjs | null) => void;
  handleEndDate: (newValue: dayjs.Dayjs | null) => void;
}

export default function DateRange({ startDate, endDate, handleStartDate, handleEndDate }: DateRangeProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          sx={{width: '100%'}}
          // label="Uncontrolled picker"
          maxDate={endDate ? endDate : undefined}
          value={startDate}
          onChange={handleStartDate}
        />
        <DatePicker
          sx={{width: '100%'}}
          // label="Controlled picker"
          minDate={startDate ? startDate : undefined}
          value={endDate}
          onChange={handleEndDate}
        />

      </DemoContainer>
    </LocalizationProvider>
  );
}