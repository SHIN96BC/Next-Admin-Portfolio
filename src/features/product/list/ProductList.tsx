'use client'

import ProductTable, {Product} from "@Src/components/tables/ProductTable";
import {
  Box,
  Chip,
  Tabs,
  Tab,
  SelectChangeEvent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";
import {ChangeEvent, useCallback, useState} from "react";
import {PRODUCT_CODE_LABEL, PRODUCT_CODE_VALUE, PRODUCT_NAME_LABEL, PRODUCT_NAME_VALUE} from "@Src/constants/product/list";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CommonSelectBox from "@Src/components/select/CommonSelectBox";
import TextField from "@mui/material/TextField";
import SearchDate from "@Src/components/search/SearchDate";
import dayjs, {Dayjs} from "dayjs";
import MainCard from "@Src/components/common/cards/MainCard";
import {FormattedMessage} from "react-intl";
import TotalProductTable from "@Src/features/product/list/TotalProductTable";

type TestDataType = {
  status: string;
};

const tabOptions = [
  {
    id: 'total',
    status: 'Total',
    label: 'productList.tab.total'
  },
  {
    id: 'active',
    status: 'Active',
    label: 'productList.tab.active'
  },
  {
    id: 'inactive',
    status: 'Inactive',
    label: 'productList.tab.inactive'
  },
  {
    id: 'delete',
    status: 'Delete',
    label: 'productList.tab.delete'
  },
];

const testCategoryOptions = [
  {
    value: 'category1',
    label: 'Category1',
  },
  {
    value: 'category2',
    label: 'Category2',
  },
  {
    value: 'category3',
    label: 'Category3',
  },
];

const searchTypeOptions = [
  {
    value: PRODUCT_NAME_VALUE,
    label: PRODUCT_NAME_LABEL,
  },
  {
    value: PRODUCT_CODE_VALUE,
    label: PRODUCT_CODE_LABEL,
  },
];

export default function ProductList() {
  const totalProductCount = 4;

  const tabs = [...new Set(tabOptions.map((item: TestDataType) => item.status))];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const countGroup = tabOptions.map((item: TestDataType) => item.status);
  const counts = countGroup.reduce(
    (acc: any, value: any) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [searchType, setSearchType] = useState<string>(PRODUCT_NAME_VALUE);
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchSpecialPrice, setSearchSpecialPrice] = useState<string>('TOT');

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const handleChangeSearchType = useCallback((event: SelectChangeEvent) => {
    setSearchType(event.target.value);
  }, [setSearchType]);

  const handleChangeCategory = useCallback((event: SelectChangeEvent) => {
    setSearchCategory(event.target.value);
  }, [setSearchCategory]);

  const handleChangeSpacialPrice = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSpecialPrice(event.target.value);
  }, [setSearchSpecialPrice]);

  const handleChangeStartDate = useCallback((newValue: dayjs.Dayjs | null) => {
    setStartDate(newValue);
  }, [setStartDate]);

  const handleChangeEndDate = useCallback((newValue: dayjs.Dayjs | null) => {
    setEndDate(newValue);
  }, [setEndDate]);


  return (
    <Box>
      <Box sx={{ p: 2.5, pb: 0, width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e: ChangeEvent<{}>, value: string) => setActiveTab(value)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabs.map((status: string, index: number) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={
                <Chip
                  label={
                    status === 'Total'
                      ? totalProductCount
                      : status === 'Active'
                        ? counts.Active
                        : status === 'Inactive'
                          ? counts.Inactive
                          : status === 'Delete'
                            ? counts.Delete
                            : undefined
                  }
                  color={status === 'Total' ? 'primary' : status === 'Active' ? 'success' : status === 'Inactive' ? 'warning' : 'error'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>

      <Box my={2}>
        <MainCard>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h5">
                  <FormattedMessage id="productList.search.productInfo.title" />
                </Typography>
                <Box>
                  <Grid container>
                    <Grid item pr={2}>
                      <CommonSelectBox
                        isFullWidth
                        isLocales
                        minWidth={140}
                        value={searchType}
                        options={searchTypeOptions}
                        handleChange={handleChangeSearchType}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        id="outlined-basic-fullwidth"
                        label="Fullwidth"
                        sx={{ minWidth: 400}}
                      />
                    </Grid>
                  </Grid>
                </Box>

              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box>
                  <Grid container>
                    <Grid item pr={2}>
                      <Typography variant="h5">
                        <FormattedMessage id="productList.search.category.title" />
                      </Typography>
                      <Box>
                        <Grid container>
                          <Grid item>
                            <CommonSelectBox
                              isFullWidth
                              minWidth={140}
                              value={searchCategory}
                              options={testCategoryOptions}
                              handleChange={handleChangeCategory}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        <FormattedMessage id="productList.search.specialPrice.title" />
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            row
                            value={searchSpecialPrice}
                            onChange={handleChangeSpacialPrice}
                          >
                            <FormControlLabel value="TOT" control={<Radio />} label={<FormattedMessage id="productList.search.specialPrice.radio.total" />} />
                            <FormControlLabel value="ENA" control={<Radio />} label={<FormattedMessage id="productList.search.specialPrice.radio.enabled" />} />
                            <FormControlLabel value="DIS" control={<Radio />} label={<FormattedMessage id="productList.search.specialPrice.radio.disabled" />} />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <SearchDate
                  startDate={startDate}
                  endDate={endDate}
                  handleStartDate={handleChangeStartDate}
                  handleEndDate={handleChangeEndDate}
                />
              </Grid>

              <Grid item>
                <Box display="flex" alignItems="center">
                  <Box pr={2}>
                    <Button variant="contained"><FormattedMessage id="productList.search.button.search" /></Button>
                  </Box>
                  <Box>
                    <Button variant="contained"><FormattedMessage id="productList.search.button.reset" /></Button>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </MainCard>
      </Box>

      <TotalProductTable />
    </Box>
  );
}