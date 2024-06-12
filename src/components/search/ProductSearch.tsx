import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MainCard from "@Src/components/common/cards/MainCard";
import Typography from "@mui/material/Typography";
import CommonSelectBox, {SelectOptionType} from "@Src/components/select/CommonSelectBox";
import {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import dayjs, {Dayjs} from "dayjs";

interface DatePicker {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  handleStartDate: (newValue: dayjs.Dayjs | null) => void;
  handleEndDate: (newValue: dayjs.Dayjs | null) => void;
}

interface Props {
  searchType: string;
  searchTypeOptions: SelectOptionType[];
  handleChangeSearchType: (event: SelectChangeEvent<string>) => void;
}

export default function ProductSearch({searchType, searchTypeOptions, handleChangeSearchType}: Props) {

  return (
    <Box>
      <MainCard>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography>
                Product Information
              </Typography>
              <Box>
                <Grid container>
                  <Grid item>
                    <CommonSelectBox
                      isFullWidth={true}
                      value={searchType}
                      options={searchTypeOptions}
                      handleChange={handleChangeSearchType}
                    />
                  </Grid>
                  <Grid item pl={1}>
                    <TextField fullWidth id="outlined-basic-fullwidth" label="Fullwidth" />
                  </Grid>
                </Grid>
              </Box>

            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <Grid container>
                  <Grid item>
                    <Typography>
                      Category
                    </Typography>
                    <Box>
                      <Grid container>
                        <Grid item>
                          <CommonSelectBox
                            isFullWidth={true}
                            value={searchType}
                            options={searchTypeOptions}
                            handleChange={handleChangeSearchType}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Special Price
                    </Typography>
                    <Box>
                      <Grid container>
                        <Grid item>
                          <CommonSelectBox
                            isFullWidth={true}
                            value={searchType}
                            options={searchTypeOptions}
                            handleChange={handleChangeSearchType}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {/*<SearchDate*/}
              {/*  startDate={dayjs()}*/}
              {/*  endDate={dayjs()}*/}
              {/*  handleStartDate={(newValue) => setStartDate(newValue)}*/}
              {/*  handleEndDate={(newValue) => setEndDate(newValue)}*/}
              {/*/>*/}
            </Grid>

          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}