'use client'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainCard from "@Src/components/common/cards/MainCard";
import Button from "@mui/material/Button";
import ScrollView from "@Src/components/common/scroll/ScrollView";
import MainCategoryDnd, {CategoryDnd} from "@Src/components/dnd/MainCategoryDnd";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import RequiredMark from "@Src/components/common/RequiredMark";
import {FieldValues, SubmitHandler, useForm, useWatch} from "react-hook-form";
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  RADIO_TYPE_DISABLED_LABEL,
  RADIO_TYPE_DISABLED_VALUE,
  RADIO_TYPE_ENABLED_LABEL,
  RADIO_TYPE_ENABLED_VALUE
} from "@Src/constants/category";
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import Stack from "@mui/material/Stack";
import ProductUpload from "@Src/components/third-party/dropzone/ProductUpload";
import FormHelperText from "@mui/material/FormHelperText";
import {FormattedMessage} from "react-intl";
import {useFindByCategories} from "@Src/services/classification/category/useCategoryService";
import {Reorder} from "@Src/utils/dnd/category";
import {findByUploadUrl, useUploadFiles} from "@Src/services/files/useFilesService";
import {S3UploadFields} from "@Src/services/files/model";
import {
  CategoryFormData,
  categorySchema,
  CategorySchemaKeys
} from "@Src/validation/schema/classification/category";

// fake data generator
const getTestCategory = (count: number): CategoryDnd[] => {
  return Array.from({length: count}, (v, k) => k).map(k => ({
    id: `category-${k}`,
    content: `category ${k}`,
    subCategories: [
      {
        id: `${k}-subCategory-1`,
        content: `subCategory 1`,
        subCategories: [],
      },
      {
        id: `${k}-subCategory-2`,
        content: `subCategory 2`,
        subCategories: [],
      },
      {
        id: `${k}-subCategory-3`,
        content: `subCategory 3`,
        subCategories: [],
      },
    ]
  }));
}

const CustomButton = styled(Button)(() => ({
  minWidth: 0,
}));

export type SelectedCategory = {
  id: string;
  type: string;
  element?: HTMLInputElement;
};

const availabilityTypeOptions = [
  {
    value: RADIO_TYPE_ENABLED_VALUE,
    label: RADIO_TYPE_ENABLED_LABEL,
  },
  {
    value: RADIO_TYPE_DISABLED_VALUE,
    label: RADIO_TYPE_DISABLED_LABEL,
  },
];

const ageTypeOptions = [
  {
    value: RADIO_TYPE_ENABLED_VALUE,
    label: RADIO_TYPE_ENABLED_LABEL,
  },
  {
    value: RADIO_TYPE_DISABLED_VALUE,
    label: RADIO_TYPE_DISABLED_LABEL,
  },
];

export default function CategoryManagement() {
  // const { data: categories } = useFindByCategories();
  const { mutate: mutateFileUpload } = useUploadFiles();

  const [categories, setCategories] = useState(getTestCategory(3));
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    id: '',
    type: '',
  });

  const categoryScrollViewRef = useRef<HTMLDivElement>(null);

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: 'onChange',
    defaultValues: {
      nameEn: '',
      nameKo: '',
      availability: RADIO_TYPE_ENABLED_VALUE,
      ageVerification: RADIO_TYPE_DISABLED_VALUE,
      files: null
    }
  });

  const watchFiles = useWatch({
    name: 'files',
    control
  });

  const [availabilityType, setAvailabilityType] = useState(RADIO_TYPE_ENABLED_VALUE);
  const [ageType, setAgeType] = useState(RADIO_TYPE_DISABLED_VALUE);

  const handleChangeAvailabilityType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailabilityType(event.target.value);
  }, [setAvailabilityType]);

  const handleChangeAgeType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeType(event.target.value);
  }, [setAgeType]);

  const handleChangeCategory = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log('id event.target.value = ', event.target.value);
    console.log('id event = ', event.target.className);
    setSelectedCategory(category => {
      if (category.id === event.target.value) {
        return {
          id: '',
          type: '',
        };
      } else {
        // moveCategoryScroll({ scrollEl: categoryScrollViewRef.current, selectedEl: event.target });
        return {
          id: event.target.value,
          type: event.target.className,
          element: event.target
        };
      }
    });
  }, [setSelectedCategory, categoryScrollViewRef]);

  // 순서변경 버튼
  const handleMoveOneUp = () => {
    const type = selectedCategory.type;

    // moveCategoryScroll({ scrollEl: categoryScrollViewRef.current, selectedEl: selectedCategory.element });

    if (type === 'CATEGORY') {
      const index = categories.findIndex((category) => category.id === selectedCategory.id);

      console.log('index = ', index);

      const newCategories = Reorder(
        categories,
        index,
        index > 0 ? index - 1 : 0
      );

      setCategories(newCategories);
    } else {
      const oriSubCategories = categories[parseInt(type, 10)].subCategories;

      const index = oriSubCategories.findIndex((subCategory) => subCategory.id === selectedCategory.id);

      console.log('index = ', index);

      const subCategories = Reorder(
        oriSubCategories,
        index,
        index > 0 ? index - 1 : 0
      );

      const newCategories = JSON.parse(JSON.stringify(categories));

      newCategories[type].subCategories = subCategories;

      setCategories(newCategories);
    }
  };

  const handleMoveOneDown = () => {
    const type = selectedCategory.type;

    // moveCategoryScroll({ scrollEl: categoryScrollViewRef.current, selectedEl: selectedCategory.element });

    if (type === 'CATEGORY') {
      const index = categories.findIndex((category) => category.id === selectedCategory.id);

      console.log('index = ', index);

      const newCategories = Reorder(
        categories,
        index,
        index < categories.length - 1 ? index + 1 : categories.length - 1
      );

      setCategories(newCategories);
    } else {
      const oriSubCategories = categories[parseInt(type, 10)].subCategories;

      const index = oriSubCategories.findIndex((subCategory) => subCategory.id === selectedCategory.id);

      console.log('index = ', index);

      const subCategories = Reorder(
        oriSubCategories,
        index,
        index < oriSubCategories.length - 1 ? index + 1 : oriSubCategories.length - 1
      );

      const newCategories = JSON.parse(JSON.stringify(categories));

      newCategories[type].subCategories = subCategories;

      setCategories(newCategories);
    }
  };

  const handleMoveTop = () => {
    const type = selectedCategory.type;

    // moveCategoryScroll({ scrollEl: categoryScrollViewRef.current, selectedEl: selectedCategory.element });

    if (type === 'CATEGORY') {
      const index = categories.findIndex((category) => category.id === selectedCategory.id);

      console.log('index = ', index);

      const newCategories = Reorder(
        categories,
        index,
        0
      );

      setCategories(newCategories);
    } else {
      const oriSubCategories = categories[parseInt(type, 10)].subCategories;

      const index = oriSubCategories.findIndex((subCategory) => subCategory.id === selectedCategory.id);

      console.log('index = ', index);

      const subCategories = Reorder(
        oriSubCategories,
        index,
        0
      );

      const newCategories = JSON.parse(JSON.stringify(categories));

      newCategories[type].subCategories = subCategories;

      setCategories(newCategories);
    }
  };

  const handleMoveBottom = () => {
    const type = selectedCategory.type;

    // moveCategoryScroll({ scrollEl: categoryScrollViewRef.current, selectedEl: selectedCategory.element });

    if (type === 'CATEGORY') {
      const index = categories.findIndex((category) => category.id === selectedCategory.id);

      const newCategories = Reorder(
        categories,
        index,
        categories.length - 1
      );

      setCategories(newCategories);
    } else {
      const oriSubCategories = categories[parseInt(type, 10)].subCategories;

      const index = oriSubCategories.findIndex((subCategory) => subCategory.id === selectedCategory.id);

      const subCategories = Reorder(
        oriSubCategories,
        index,
        oriSubCategories.length - 1
      );

      const newCategories = JSON.parse(JSON.stringify(categories));

      newCategories[type].subCategories = subCategories;

      setCategories(newCategories);
    }
  };

  const handleChangeCategories = useCallback((newCategories: CategoryDnd[]) => {
    setCategories(newCategories);
  }, [setCategories]);

  const moveCategoryScroll = ({scrollEl, selectedEl}: {scrollEl?: HTMLDivElement | null, selectedEl?: HTMLInputElement}) => {
    if (scrollEl && selectedEl) {
      console.log('selectedCategory.element = ', selectedCategory.element);
      // selectedCategory.element.focus();
      // selectedCategory.element.scrollIntoView({ block: 'center', inline: 'center' });

      const contentRect = scrollEl.getBoundingClientRect();
      const selectedRect = selectedEl.getBoundingClientRect();
      const offsetY = selectedRect.top - contentRect.top - (contentRect.height - selectedRect.height) / 2;
      scrollEl.scrollTop += offsetY;
    }
  };

  const handleChangeFilesValue = useCallback((value: any) => {
    setValue('files', value);
  }, [setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async ({nameEn, nameKo, availability, ageVerification, files}) => {
    console.log('onSubmit')
    console.log('react-hook-form files =', files);

    // 파일을 업로드 하기 위한 url 조회
    const data = await findByUploadUrl();

    console.log('data = ', data);

    // 파일 업로드
    const uploadFields: S3UploadFields = {
      ...data.fields,
      'Content-Type': 'image/jpg'
    };

    console.log('uploadFields = ', uploadFields);

    const formData = new FormData();

    Object.keys(uploadFields).forEach((key) => formData.append(key, uploadFields[key]));

    formData.append('file', files[0]);

    const filePath = data.fields.key;

    const imagePath = filePath.replace('${filename}', files[0].name);

    console.log('formData = ', JSON.stringify(formData));
    console.log('imagePath = ', imagePath);

    mutateFileUpload({
      url: data.url,
      data: formData,
    }, {
      onSuccess: (isSuccess) => {
        console.log('upload success isSuccess = ', isSuccess);

      }
    });

  };

  useEffect(() => {
    if (categoryScrollViewRef.current && selectedCategory.element) {
      // selectedCategory.element.focus();
      // selectedCategory.element.scrollIntoView({ block: 'center', inline: 'center' });

      const contentRect = categoryScrollViewRef.current.getBoundingClientRect();
      const selectedRect = selectedCategory.element.getBoundingClientRect();
      const offsetY = selectedRect.top - contentRect.top - (contentRect.height - selectedRect.height) / 2;
      categoryScrollViewRef.current.scrollTop += offsetY;

      // selectedCategory.element.scrollIntoView({ block: 'nearest' });
      // selectedCategory.element.focus();
    }
  }, [categories, categoryScrollViewRef, selectedCategory.element]);

  console.log('categories = ', categories);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <MainCard title={<Typography variant="h4"><FormattedMessage id="category.categorySetting.title" /></Typography>}>
              <Grid container sx={{height: 697}}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Box pr={2}>
                      <Button variant="contained"><FormattedMessage id="category.button.delete" /></Button>
                    </Box>
                    <Box>
                      <Button variant="contained"><FormattedMessage id="category.button.add" /></Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <ScrollView ref={categoryScrollViewRef} height={500} border="1px solid #e6ebf1">
                    <MainCategoryDnd
                      categories={categories}
                      selectedCategory={selectedCategory}
                      handleChangeCategory={handleChangeCategory}
                      handleChangeCategories={handleChangeCategories}
                    />
                  </ScrollView>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Box>
                    <CustomButton onClick={handleMoveOneUp}>
                      <KeyboardArrowUpIcon />
                    </CustomButton>
                    <CustomButton onClick={handleMoveOneDown}>
                      <KeyboardArrowDownIcon />
                    </CustomButton>
                    <CustomButton onClick={handleMoveTop}>
                      <KeyboardDoubleArrowUpIcon />
                    </CustomButton>
                    <CustomButton onClick={handleMoveBottom}>
                      <KeyboardDoubleArrowDownIcon />
                    </CustomButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained"><FormattedMessage id="category.button.saveMove" /></Button>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <MainCard title={<Typography variant="h4"><FormattedMessage id="category.categoryInfo.title" /></Typography>}>
              <Grid container sx={{height: 697}}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h5">
                    <FormattedMessage id="category.categoryInfo.categoryNameEn" /><RequiredMark />
                  </Typography>

                  <TextField
                    {...register('nameEn')}
                    id="category-name-en"
                    fullWidth
                  />
                  {errors.nameEn && (
                    <FormHelperText error id="helper-text-nameEn">
                      <FormattedMessage id={errors.nameEn.message} />
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Typography variant="h5">
                    <FormattedMessage id="category.categoryInfo.categoryNameKo" /><RequiredMark />
                  </Typography>

                  <TextField
                    {...register('nameKo')}
                    id="category-name-en"
                    fullWidth
                  />
                  {errors.nameKo && (
                    <FormHelperText error id="helper-text-nameKo">
                      <FormattedMessage id={errors.nameKo.message} />
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Typography variant="h5">
                    <FormattedMessage id="category.categoryInfo.availability" />
                  </Typography>

                  <FormControl component="fieldset">
                    <RadioGroup
                      {...register('availability')}
                      aria-label="availability-type"
                      name="availability-type-group"
                      row
                      value={availabilityType}
                      onChange={handleChangeAvailabilityType}
                    >
                      {
                        availabilityTypeOptions.map((option) => (
                          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={<FormattedMessage id={option.label} />} />
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Typography variant="h5">
                    <FormattedMessage id="category.categoryInfo.ageVerification" />
                  </Typography>

                  <FormControl component="fieldset">
                    <RadioGroup
                      {...register('ageVerification')}
                      aria-label="age-type"
                      name="age-type-group"
                      row
                      value={ageType}
                      onChange={handleChangeAgeType}
                    >
                      {
                        ageTypeOptions.map((option) => (
                          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={<FormattedMessage id={option.label} />} />
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Typography variant="h5"><FormattedMessage id="category.categoryInfo.categoryImage" /></Typography>

                  <Box pt={2}>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack>
                          <Stack spacing={1.5}>
                            <ProductUpload
                              layoutType="box"
                              register={register('files')}
                              setFieldValue={handleChangeFilesValue}
                              file={watchFiles}
                              error={!!errors.files}
                            />

                            <Stack spacing={0}>
                              <Typography variant="caption" color="secondary">
                                Registration Image: Up to 1MB / gif, png, jpg(jpeg)
                              </Typography>
                            </Stack>
                          </Stack>
                          {errors.files && typeof errors.files.message === 'string' && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                              {errors.files.message}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      {/*<Grid item xs={12}>*/}
                      {/*  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>*/}
                      {/*    <Button color="error" onClick={() => setFieldValue('files', null)}>*/}
                      {/*      Cancel*/}
                      {/*    </Button>*/}
                      {/*    <Button type="submit" variant="contained">*/}
                      {/*      Submit*/}
                      {/*    </Button>*/}
                      {/*  </Stack>*/}
                      {/*</Grid>*/}
                    </Grid>

                    {/*<Formik*/}
                    {/*  initialValues={{ files: null }}*/}
                    {/*  onSubmit={(values: any, { setSubmitting }) => {*/}
                    {/*    // submit form*/}
                    {/*    console.log('formik files = ', values);*/}
                    {/*  }}*/}
                    {/*  validationSchema={yup.object().shape({*/}
                    {/*    // files: yup.mixed().required('Avatar is a required.')*/}
                    {/*    files: yup.mixed()*/}
                    {/*  })}*/}
                    {/*>*/}
                    {/*  {({ values, handleSubmit, setFieldValue, touched, errors }) => (*/}
                    {/*    <form onSubmit={handleSubmit}>*/}
                    {/*      <Grid container spacing={3}>*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*          <Stack>*/}
                    {/*            <Stack spacing={1.5}>*/}
                    {/*              <ProductUpload*/}
                    {/*                layoutType="box"*/}
                    {/*                setFieldValue={setFieldValue}*/}
                    {/*                file={values.files}*/}
                    {/*                error={touched.files && !!errors.files}*/}
                    {/*              />*/}

                    {/*              <Stack spacing={0}>*/}
                    {/*                <Typography variant="caption" color="secondary">*/}
                    {/*                  Registration Image: Up to 1MB / gif, png, jpg(jpeg)*/}
                    {/*                </Typography>*/}
                    {/*              </Stack>*/}
                    {/*            </Stack>*/}
                    {/*            {touched.files && errors.files && (*/}
                    {/*              <FormHelperText error id="standard-weight-helper-text-password-login">*/}
                    {/*                {errors.files as string}*/}
                    {/*              </FormHelperText>*/}
                    {/*            )}*/}
                    {/*          </Stack>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>*/}
                    {/*            <Button color="error" onClick={() => setFieldValue('files', null)}>*/}
                    {/*              Cancel*/}
                    {/*            </Button>*/}
                    {/*            <Button type="button" variant="contained" onClick={() => handleSubmit()}>*/}
                    {/*              Submit*/}
                    {/*            </Button>*/}
                    {/*          </Stack>*/}
                    {/*        </Grid>*/}
                    {/*      </Grid>*/}
                    {/*    </form>*/}
                    {/*  )}*/}
                    {/*</Formik>*/}
                  </Box>
                </Grid>
                {/*<Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={12.3}>*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" type="submit">
                      <FormattedMessage id="category.button.save" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}