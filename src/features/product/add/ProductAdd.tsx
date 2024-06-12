'use client'

import Box from "@mui/material/Box";
import MainCard from "@Src/components/common/cards/MainCard";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import UploadMultiFile from '@Src/components/third-party/dropzone/MultiFile';
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import ProductUpload from "@Src/components/third-party/dropzone/ProductUpload";
import {CustomFile, DropzopType} from "@Src/types/dropzone";
import SetDiscountModal from "@Src/modal/product/SetDiscountModal";
import {SetDiscount} from "@Src/types/discount";
import dayjs, {Dayjs} from "dayjs";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import {
  DESCRIPTION_TYPE_EN_LABEL, DESCRIPTION_TYPE_EN_VALUE, DESCRIPTION_TYPE_KO_LABEL, DESCRIPTION_TYPE_KO_VALUE,
  DISCOUNT_PROMOTION_TYPE_DATE_LABEL,
  DISCOUNT_PROMOTION_TYPE_DATE_VALUE,
  DISCOUNT_PROMOTION_TYPE_LONG_LABEL,
  DISCOUNT_PROMOTION_TYPE_LONG_VALUE,
  OPTION_TYPE_DISABLED_LABEL,
  OPTION_TYPE_DISABLED_VALUE,
  OPTION_TYPE_ENABLED_LABEL,
  OPTION_TYPE_ENABLED_VALUE
} from "@Src/constants/product/add";
import RequiredMark from "@Src/components/common/RequiredMark";
import OptionTable, {Option} from "@Src/components/tables/OptionTable";
import {FormattedMessage, useIntl} from "react-intl";
import EnterOptionForm from "@Src/features/product/add/EnterOptionForm";
import {Controller, FieldValues, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RADIO_TYPE_DISABLED_VALUE, RADIO_TYPE_ENABLED_VALUE} from "@Src/constants/category";
import {EnterOptionListData, enterOptionListSchema,} from "@Src/validation/schema/product/add";
import generateOptions from "@Src/utils/option/generateOptions";
import {filesSchema, FilesSchemaType} from "@Src/validation/schema/file";

const promotionTypeOptions = [
  {
    value: DISCOUNT_PROMOTION_TYPE_LONG_VALUE,
    label: DISCOUNT_PROMOTION_TYPE_LONG_LABEL,
  },
  {
    value: DISCOUNT_PROMOTION_TYPE_DATE_VALUE,
    label: DISCOUNT_PROMOTION_TYPE_DATE_LABEL,
  },
];

const optionTypeOptions = [
  {
    value: OPTION_TYPE_ENABLED_VALUE,
    label: OPTION_TYPE_ENABLED_LABEL,
  },
  {
    value: OPTION_TYPE_DISABLED_VALUE,
    label: OPTION_TYPE_DISABLED_LABEL,
  }
];

type EnterOption = {
  name: string;
  value: string;
};

const optionLimit = 2;

export default function ProductAdd() {
  const enterOptionForm = useForm<EnterOptionListData>({
    resolver: zodResolver(enterOptionListSchema),
    mode: 'onChange',
    defaultValues: {
      list: [
        {
          name: '',
          value: '',
        }
      ],
    }
  });

  const productImageForm = useForm<FilesSchemaType>({
    resolver: zodResolver(filesSchema),
    defaultValues: { files: undefined }
  });

  const detailEnImageForm = useForm<FilesSchemaType>({
    resolver: zodResolver(filesSchema),
    defaultValues: { files: undefined }
  });

  const detailKoImageForm = useForm<FilesSchemaType>({
    resolver: zodResolver(filesSchema),
    defaultValues: { files: undefined }
  });

  const handleChangeProductImage = useCallback((value: CustomFile[]) => {
    productImageForm.setValue('files', value);
  }, [productImageForm]);

  const handleChangeDetailEnImage = useCallback((value: CustomFile[]) => {
    detailEnImageForm.setValue('files', value);
  }, [detailEnImageForm]);

  const handleChangeDetailKoImage = useCallback((value: CustomFile[]) => {
    detailKoImageForm.setValue('files', value);
  }, [detailKoImageForm]);

  const onFilesSubmit = (data: FilesSchemaType) => {
    console.log('files = ', data);
  };

  const { fields, append, remove, move } = useFieldArray({
    control: enterOptionForm.control,
    name: 'list'
  });

  const [enterOptions, setEnterOptions] = useState<EnterOption[]>([]);
  const optionTableData = useMemo((): Option[] => {
    console.log('enterOption = ', enterOptions);

    const valueList: string[][] = [];

    enterOptions.forEach((option) => {
      const values = option.value.split(',');
      valueList.push(values);
    });

    const newList = generateOptions(valueList);

    console.log('newList = ', newList);

    return newList;
  }, [enterOptions]);

  const [listEn, setListEn] = useState(true);
  const [listKo, setListKo] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('EN');

  const [discountOpen, setDiscountOpen] = useState<boolean>(false);

  const [discount, setDiscount] = useState<SetDiscount>({
    discount: '',
    promotionType: DISCOUNT_PROMOTION_TYPE_LONG_VALUE,
    promotionStartDate: '',
    promotionEndDate: '',
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [optionType, setOptionType] = useState<string>(OPTION_TYPE_DISABLED_VALUE);


  const handleOpenDiscount = useCallback(() => {
    setDiscountOpen(flag => !flag);
  }, [setDiscountOpen]);

  const handleDiscountSuccess = ({discount, promotionType, promotionEndDate, promotionStartDate}: SetDiscount) => {
    setDiscount({
      discount,
      promotionType,
      promotionStartDate,
      promotionEndDate,
    });

    setDiscountOpen(false);
  };

  const handleDiscountCancel = useCallback(() => {
    setDiscountOpen(false)
  }, [setDiscountOpen]);

  const handleChangeStartDate = useCallback((newValue: dayjs.Dayjs | null) => {
    setStartDate(newValue);
  }, [setStartDate]);

  const handleChangeEndDate = useCallback((newValue: dayjs.Dayjs | null) => {
    setEndDate(newValue);
  }, [setEndDate]);

  const handleChangeOptionType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionType(event.target.value);
  }, [setOptionType]);

  const handleAddOption = useCallback(() => {
    if (fields.length < optionLimit) {
      append({
        name: '',
        value: '',
      });
    }
  }, [fields, append]);

  const handleRemoveOption = useCallback((index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  }, [fields, remove]);

  const handleMoveOption = useCallback((from: number, to: number) => {
    move(from, to);
  }, [move]);

  const handleTableOptionDelete = useCallback(() => {

  }, []);

  const onSubmitOption: SubmitHandler<FieldValues> = ({ list }) => {
    console.log('list = ', list);
    setEnterOptions(list);
  };

  const data: Option[] = [
    {
      option1: '오렌지',
      option2: 'S',
      optionPrice: '1200',
      specialPrice: '1000',
      stock: '5',
      availability: false,
    }
  ];

  return (
    <Box>

      {/* 상품명 등록 */}
      <MainCard title={<Typography variant="h4"><FormattedMessage id="productAdd.basicInfo.title" /></Typography>}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
            <Typography variant="h5">
              <FormattedMessage id="productAdd.basicInfo.productNameEn" /><RequiredMark />
              {/*Product Name(En)<RequiredMark />*/}
            </Typography>

            <TextField
              id="outlined-basic-fullwidth"
              sx={{ minWidth: 400}}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
            <Typography variant="h5">
              <FormattedMessage id="productAdd.basicInfo.productNameKo" /><RequiredMark />
            </Typography>

            <TextField
              id="outlined-basic-fullwidth"
              sx={{ minWidth: 400}}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
            <Typography variant="h5">
              <FormattedMessage id="productAdd.basicInfo.productCode" /><RequiredMark />
            </Typography>

            <TextField
              id="outlined-basic-fullwidth"
              sx={{ minWidth: 400}}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
            <Typography variant="h5">
              <FormattedMessage id="productAdd.basicInfo.category" /><RequiredMark />
            </Typography>

            <TextField
              id="outlined-basic-fullwidth"
              sx={{ minWidth: 400}}
            />
          </Grid>
        </Grid>

      </MainCard>


      {/* 상품 이미지 등록 */}
      <MainCard title={<Typography variant="h4"><FormattedMessage id="productAdd.productImage.title" /></Typography>}>

        <form onSubmit={productImageForm.handleSubmit(onFilesSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack alignItems="center">
                <Stack spacing={1.5} alignItems="center">
                  <Controller
                    name="files"
                    control={productImageForm.control}
                    render={({ field }) => (
                      <ProductUpload
                        setFieldValue={handleChangeProductImage}
                        file={field.value || null}
                        error={!!productImageForm.formState.errors.files}
                      />
                    )}
                  />
                  <Stack spacing={0}>
                    <Typography align="center" variant="caption" color="secondary">
                      Allowed &lsquo;image/*&rsquo;
                    </Typography>
                    <Typography align="center" variant="caption" color="secondary">
                      *.png, *.jpeg, *.jpg, *.gif
                    </Typography>
                  </Stack>
                </Stack>
                {productImageForm.formState.errors.files && (
                  <FormHelperText error>
                    {productImageForm.formState.errors.files.message}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button color="error" onClick={() => productImageForm.setValue('files', null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>


      {/* 상품 설명 */}
      <MainCard title={<Typography variant="h4"><FormattedMessage id="productAdd.description.title" /></Typography>}>
        <Tabs
          value={activeTab}
          onChange={(e: ChangeEvent<{}>, value: string) => setActiveTab(value)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab
            label={<FormattedMessage id={DESCRIPTION_TYPE_EN_LABEL} />}
            value={DESCRIPTION_TYPE_EN_VALUE}
            iconPosition="end"
            sx={{ width: '50%', maxWidth: '50%' }}
          />
          <Tab
            label={<FormattedMessage id={DESCRIPTION_TYPE_KO_LABEL} />}
            value={DESCRIPTION_TYPE_KO_VALUE}
            iconPosition="end"
            sx={{ width: '50%', maxWidth: '50%' }}
          />
        </Tabs>

        {
          activeTab === DESCRIPTION_TYPE_EN_VALUE &&
            <Box pt={3}>
              <MainCard title={<FormattedMessage id="productAdd.description.en.title" />}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={10}
                  defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
                />
              </MainCard>

              <MainCard
                title={<FormattedMessage id="productAdd.description.en.imageReg" />}
                secondary={
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <IconButton color={listEn ? 'secondary' : 'primary'} size="small" onClick={() => setListEn(false)}>
                      <UnorderedListOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color={listEn ? 'primary' : 'secondary'} size="small" onClick={() => setListEn(true)}>
                      <AppstoreOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                  </Stack>
                }
              >
                {/* 멀티 업로드 */}
                <form onSubmit={detailEnImageForm.handleSubmit(onFilesSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <Controller
                          name="files"
                          control={detailEnImageForm.control}
                          render={({ field }) => (
                            <UploadMultiFile
                              showList={listEn}
                              setFieldValue={handleChangeDetailEnImage}
                              type={DropzopType.product}
                              files={field.value}
                              error={!!detailEnImageForm.formState.errors.files}
                            />
                          )}
                        />
                      </Stack>
                      {detailEnImageForm.formState.errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {detailEnImageForm.formState.errors.files.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>

                {/*<Formik*/}
                {/*  initialValues={{ files: null }}*/}
                {/*  onSubmit={(values: any) => {*/}
                {/*    // submit form*/}
                {/*  }}*/}
                {/*  validationSchema={yup.object().shape({*/}
                {/*    files: yup.mixed().required('Avatar is a required.')*/}
                {/*  })}*/}
                {/*>*/}
                {/*  {({ values, handleSubmit, setFieldValue, touched, errors }) => (*/}
                {/*    <form onSubmit={handleSubmit}>*/}
                {/*      <Grid container spacing={3}>*/}
                {/*        <Grid item xs={12}>*/}
                {/*          <Stack spacing={1.5} alignItems="center">*/}
                {/*            <UploadMultiFile*/}
                {/*              showList={listEn}*/}
                {/*              setFieldValue={setFieldValue}*/}
                {/*              files={values.files}*/}
                {/*              type={DropzopType.product}*/}
                {/*              error={touched.files && !!errors.files}*/}
                {/*            />*/}
                {/*          </Stack>*/}
                {/*          {touched.files && errors.files && (*/}
                {/*            <FormHelperText error id="standard-weight-helper-text-password-login">*/}
                {/*              {errors.files as string}*/}
                {/*            </FormHelperText>*/}
                {/*          )}*/}
                {/*        </Grid>*/}
                {/*      </Grid>*/}
                {/*    </form>*/}
                {/*  )}*/}
                {/*</Formik>*/}

                <Typography pt={2.5} color={"#999"}>
                  - Recommended Image: 500px*500px / Under 1MB / gif, png, jpg(jpeg) / Up to 20 images can be added
                </Typography>
              </MainCard>
            </Box>
        }

        {
          activeTab === DESCRIPTION_TYPE_KO_VALUE &&
            <Box pt={3}>
              <MainCard title={<FormattedMessage id="productAdd.description.ko.title" />}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={10}
                  defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
                />
              </MainCard>

              <MainCard
                title={<FormattedMessage id="productAdd.description.ko.imageReg" />}
                secondary={
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <IconButton color={listKo ? 'secondary' : 'primary'} size="small" onClick={() => setListKo(false)}>
                      <UnorderedListOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color={listKo ? 'primary' : 'secondary'} size="small" onClick={() => setListKo(true)}>
                      <AppstoreOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                  </Stack>
                }
              >
                {/* 멀티 업로드 */}
                <form onSubmit={detailKoImageForm.handleSubmit(onFilesSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <Controller
                          name="files"
                          control={detailKoImageForm.control}
                          render={({ field }) => (
                            <UploadMultiFile
                              showList={listEn}
                              setFieldValue={handleChangeDetailKoImage}
                              type={DropzopType.product}
                              files={field.value}
                              error={!!detailKoImageForm.formState.errors.files}
                            />
                          )}
                        />
                      </Stack>
                      {detailKoImageForm.formState.errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {detailKoImageForm.formState.errors.files.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>

                <Typography pt={2.5} color={"#999"}>
                  - Recommended Image: 500px*500px / Under 1MB / gif, png, jpg(jpeg) / Up to 20 images can be added
                </Typography>
              </MainCard>
            </Box>
        }
      </MainCard>

      {/* 가격 & 재고 */}
      <MainCard title={<Typography variant="h4"><FormattedMessage id="productAdd.priceStock.title" /></Typography>}>
        <Box>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Typography variant="h5" textAlign="center">
                <FormattedMessage id="productAdd.priceStock.regularPrice" /><RequiredMark />
              </Typography>

              <TextField
                fullWidth
                id="regular-price"
                sx={{
                  // minWidth: 400,
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
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Typography variant="h5" textAlign="center">
                <FormattedMessage id="productAdd.priceStock.discount.title" />
              </Typography>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button fullWidth onClick={handleOpenDiscount}>
                  <FormattedMessage id="productAdd.priceStock.discount.add" />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Typography variant="h5" textAlign="center">
                <FormattedMessage id="productAdd.priceStock.stock" /><RequiredMark />
              </Typography>

              <TextField
                fullWidth
                id="stock"
                sx={{
                  // minWidth: 400,
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
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Typography variant="h5" textAlign="center">
                <FormattedMessage id="productAdd.priceStock.availability" />
              </Typography>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Switch />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>


      {/* 옵션 설정 */}
      <MainCard title={<Typography variant="h4"><FormattedMessage id="productAdd.optionSetting.title" /></Typography>}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h5">
                <FormattedMessage id="productAdd.optionSetting.option.title" />
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="option-type"
                  name="option-type-group"
                  row
                  value={optionType}
                  onChange={handleChangeOptionType}
                >
                  {
                    optionTypeOptions.map((option) => (
                      <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={<FormattedMessage id={option.label} />} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </Grid>

            {optionType === OPTION_TYPE_ENABLED_VALUE && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h5">
                    <FormattedMessage id="productAdd.optionSetting.option.enterOption.title" /><RequiredMark />
                  </Typography>

                  <Box py={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Typography variant="subtitle1" textAlign="center">
                          <FormattedMessage id="productAdd.optionSetting.option.enterOption.sorting" /><RequiredMark />
                        </Typography>
                      </Grid>
                      <Grid item xs={4.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                        <Typography variant="subtitle1" textAlign="center">
                          <FormattedMessage id="productAdd.optionSetting.option.enterOption.optionName" /><RequiredMark />
                        </Typography>
                      </Grid>
                      <Grid item xs={4.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                        <Typography variant="subtitle1" textAlign="center">
                          <FormattedMessage id="productAdd.optionSetting.option.enterOption.optionValue.title" /><RequiredMark />
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      </Grid>
                    </Grid>

                    <form onSubmit={enterOptionForm.handleSubmit(onSubmitOption)}>
                      {fields.map((field, index) => {
                        return (
                          <EnterOptionForm
                            key={field.id}
                            control={enterOptionForm.control}
                            controlName={{
                              name: `list.${index}.name`,
                              value: `list.${index}.value`
                            }}
                            index={index}
                            rowCount={fields.length}
                            maxCount={optionLimit}
                            nameErrorMessage={enterOptionForm.formState.errors.list?.[index]?.name?.message}
                            valueErrorMessage={enterOptionForm.formState.errors.list?.[index]?.value?.message}
                            handleAddOption={handleAddOption}
                            handleRemoveOption={handleRemoveOption}
                            handleMoveOption={handleMoveOption}
                          />
                        );
                      })}

                      <Box pt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" type="submit" disabled={false}>
                          <FormattedMessage id="productAdd.optionSetting.option.enterOption.button.apply" />
                        </Button>
                      </Box>
                    </form>

                    {/*<Grid container spacing={1}>*/}
                    {/*  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>*/}
                    {/*    <Box display="flex" alignItems="center" justifyContent="center">*/}
                    {/*      <Button variant="contained" sx={{ minWidth: 0, p: 1 }}>*/}
                    {/*        <ArrowDownwardOutlinedIcon />*/}
                    {/*      </Button>*/}
                    {/*    </Box>*/}
                    {/*  </Grid>*/}
                    {/*  <Grid item xs={5} sm={4} md={4} lg={4} xl={4}>*/}
                    {/*    <TextField*/}
                    {/*      fullWidth*/}
                    {/*      id="option-name"*/}
                    {/*    />*/}
                    {/*  </Grid>*/}
                    {/*  <Grid item xs={5} sm={6} md={6} lg={6} xl={6}>*/}
                    {/*    <TextField*/}
                    {/*      fullWidth*/}
                    {/*      id="option-value"*/}
                    {/*    />*/}
                    {/*  </Grid>*/}
                    {/*</Grid>*/}
                  </Box>
                </Grid>
              </>
            )}

            {optionType === OPTION_TYPE_ENABLED_VALUE && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h5">
                    <FormattedMessage id="productAdd.optionSetting.table.title" /><RequiredMark />
                  </Typography>


                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <OptionTable
                    optionName1={'색상'}
                    optionName2={'사이즈'}
                    data={optionTableData}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </MainCard>


      {/* 팝업 */}
      <SetDiscountModal
        isOpen={discountOpen}
        promotionTypeOptions={promotionTypeOptions}
        handleOk={handleDiscountSuccess}
        handleCancel={handleDiscountCancel}
        startDate={startDate}
        endDate={endDate}
        handleStartDate={handleChangeStartDate}
        handleEndDate={handleChangeEndDate}
      />
    </Box>
  );
}