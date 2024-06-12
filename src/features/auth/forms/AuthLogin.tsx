'use client';

import { useState, FocusEvent, SyntheticEvent } from 'react';

// next
import {useRouter} from "next/navigation";
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { signIn } from 'next-auth/react';

// material-ui
import { Theme } from '@mui/material/styles';
import {
  Box,
  useMediaQuery,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import {FieldValues, SubmitHandler, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

// project import
import FirebaseSocial from './FirebaseSocial';
import IconButton from '@Src/components/@extended/IconButton';
import AnimateButton from '@Src/components/@extended/AnimateButton';
import { APP_DEFAULT_PATH } from '@Src/config';
import useFirebaseAuth from "@Src/hooks/auth/useFirebaseAuth";
import {
  TOO_MANY_REQUEST_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE
} from "@Src/utils/errors/message";
import CustomError from "@Src/utils/errors/customError";
import {CLIENT_UNKNOWN_ERROR_CODE} from "@Src/utils/errors/code";

// validation
import {loginSchema, LoginSchemaType} from "@Src/validation/schema/auth";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthLogin = () => {
  const router = useRouter();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [checked, setChecked] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useFirebaseAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting
    },
    setValue,
    setError
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'guest@test.com',
      password: 'qw1234!@',
    }
  });

  const watchEmail = useWatch({
    name: 'email',
    control,
  });

  const watchPassword = useWatch({
    name: 'password',
    control,
  });

  const onSubmit: SubmitHandler<FieldValues> = ({email, password}) => {
    {/* TODO: 로그인 붙일 때 까지 항상 허용 */}
    router.push(APP_DEFAULT_PATH);

    // login(email, password)
    //   .then((isSuccess) => {
    //     if (isSuccess) {
    //       router.push(APP_DEFAULT_PATH);
    //     } else {
    //       throw new CustomError(UNKNOWN_ERROR_MESSAGE, CLIENT_UNKNOWN_ERROR_CODE);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('error = ', error);
    //
    //     if (error.code === 'auth/too-many-requests') {
    //       setSubmitError(TOO_MANY_REQUEST_ERROR_MESSAGE);
    //     } else {
    //       setSubmitError(USER_NOT_FOUND_ERROR_MESSAGE);
    //     }
    //   })
    //   .finally(() => {
    //
    //   });
  };

  const setSubmitError = (message: string) => {
    setError('submit', {
      type: 'oneOf',
      message: message,
    })
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                {...register('email')}
                id="email-login"
                type="email"
                // value={values.email}
                name="email"
                // onBlur={handleBlur}
                // onChange={handleChange}
                placeholder="Enter email address"
                fullWidth
                error={!!errors.email}
              />
            </Stack>
            {errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                {...register('password')}
                fullWidth
                color={capsWarning ? 'warning' : 'primary'}
                error={!!errors.password}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                // value={values.password}
                name="password"
                onBlur={(event: FocusEvent<any, Element>) => {
                  setCapsWarning(false);
                  // handleBlur(event);
                }}
                onKeyDown={onKeyDown}
                // onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {capsWarning && (
                <Typography variant="caption" sx={{ color: 'warning.(main)' }} id="warning-helper-text-password-login">
                  Caps lock on!
                </Typography>
              )}
            </Stack>
            {errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Keep me sign in</Typography>}
              />
              {/*<NextLink href={'/forget-pass'} passHref legacyBehavior>*/}
              {/*  <Link variant="h6" color="text.primary">*/}
              {/*    Forgot Password?*/}
              {/*  </Link>*/}
              {/*</NextLink>*/}
            </Stack>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit.message}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              {/* TODO: 로그인 붙일 때 까지 항상 허용 */}
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>

      {/*<Divider sx={{ mt: 2 }}>*/}
      {/*  <Typography variant="caption"> Login with</Typography>*/}
      {/*</Divider>*/}
      {/*{providers && (*/}
      {/*  <Stack*/}
      {/*    direction="row"*/}
      {/*    spacing={matchDownSM ? 1 : 2}*/}
      {/*    justifyContent={matchDownSM ? 'space-around' : 'space-between'}*/}
      {/*    sx={{ mt: 3, '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}*/}
      {/*  >*/}
      {/*    {Object.values(providers).map((provider: any) => {*/}
      {/*      if (provider.id === 'login' || provider.id === 'register') {*/}
      {/*        return;*/}
      {/*      }*/}
      {/*      return (*/}
      {/*        <Box key={provider.name} sx={{ width: '100%' }}>*/}
      {/*          {provider.id === 'google' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Google} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Google'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*          {provider.id === 'auth0' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Auth0} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Auth0'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*          {provider.id === 'cognito' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Cognito} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Cognito'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*        </Box>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Stack>*/}
      {/*)}*/}
      {/*{!providers && (*/}
      {/*  <Box sx={{ mt: 3 }}>*/}
      {/*    <FirebaseSocial />*/}
      {/*  </Box>*/}
      {/*)}*/}

      {/*<Formik*/}
      {/*  initialValues={{*/}
      {/*    email: 'info@codedthemes.com',*/}
      {/*    password: '123456',*/}
      {/*    submit: null*/}
      {/*  }}*/}
      {/*  validationSchema={Yup.object().shape({*/}
      {/*    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),*/}
      {/*    password: Yup.string().max(255).required('Password is required')*/}
      {/*  })}*/}
      {/*  onSubmit={(values, { setErrors, setSubmitting }) => {*/}
      {/*    router.push(APP_DEFAULT_PATH);*/}
      {/*    // signIn('login', {*/}
      {/*    //   redirect: true,*/}
      {/*    //   email: values.email,*/}
      {/*    //   password: values.password,*/}
      {/*    //   callbackUrl: APP_DEFAULT_PATH*/}
      {/*    // }).then(*/}
      {/*    //   (res: any) => {*/}
      {/*    //     if (res?.errors) {*/}
      {/*    //       setErrors({ submit: res.errors });*/}
      {/*    //       setSubmitting(false);*/}
      {/*    //     } else {*/}
      {/*    //       preload('services/menu`/dashboard', fetcher); // load menus on login success*/}
      {/*    //       setSubmitting(false);*/}
      {/*    //     }*/}
      {/*    //   },*/}
      {/*    //   (res) => {*/}
      {/*    //     setErrors({ submit: res.errors });*/}
      {/*    //     setSubmitting(false);*/}
      {/*    //   }*/}
      {/*    // );*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (*/}
      {/*    <form noValidate onSubmit={handleSubmit}>*/}
      {/*      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />*/}
      {/*      <Grid container spacing={3}>*/}
      {/*        <Grid item xs={12}>*/}
      {/*          <Stack spacing={1}>*/}
      {/*            <InputLabel htmlFor="email-login">Email Address</InputLabel>*/}
      {/*            <OutlinedInput*/}
      {/*              id="email-login"*/}
      {/*              type="email"*/}
      {/*              value={values.email}*/}
      {/*              name="email"*/}
      {/*              onBlur={handleBlur}*/}
      {/*              onChange={handleChange}*/}
      {/*              placeholder="Enter email address"*/}
      {/*              fullWidth*/}
      {/*              errors={Boolean(touched.email && errors.email)}*/}
      {/*            />*/}
      {/*          </Stack>*/}
      {/*          {touched.email && errors.email && (*/}
      {/*            <FormHelperText errors id="standard-weight-helper-text-email-login">*/}
      {/*              {errors.email}*/}
      {/*            </FormHelperText>*/}
      {/*          )}*/}
      {/*        </Grid>*/}
      {/*        <Grid item xs={12}>*/}
      {/*          <Stack spacing={1}>*/}
      {/*            <InputLabel htmlFor="password-login">Password</InputLabel>*/}
      {/*            <OutlinedInput*/}
      {/*              fullWidth*/}
      {/*              color={capsWarning ? 'warning' : 'primary'}*/}
      {/*              errors={Boolean(touched.password && errors.password)}*/}
      {/*              id="-password-login"*/}
      {/*              type={showPassword ? 'text' : 'password'}*/}
      {/*              value={values.password}*/}
      {/*              name="password"*/}
      {/*              onBlur={(event: FocusEvent<any, Element>) => {*/}
      {/*                setCapsWarning(false);*/}
      {/*                handleBlur(event);*/}
      {/*              }}*/}
      {/*              onKeyDown={onKeyDown}*/}
      {/*              onChange={handleChange}*/}
      {/*              endAdornment={*/}
      {/*                <InputAdornment position="end">*/}
      {/*                  <IconButton*/}
      {/*                    aria-label="toggle password visibility"*/}
      {/*                    onClick={handleClickShowPassword}*/}
      {/*                    onMouseDown={handleMouseDownPassword}*/}
      {/*                    edge="end"*/}
      {/*                    color="secondary"*/}
      {/*                  >*/}
      {/*                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}*/}
      {/*                  </IconButton>*/}
      {/*                </InputAdornment>*/}
      {/*              }*/}
      {/*              placeholder="Enter password"*/}
      {/*            />*/}
      {/*            {capsWarning && (*/}
      {/*              <Typography variant="caption" sx={{ color: 'warning.(main)' }} id="warning-helper-text-password-login">*/}
      {/*                Caps lock on!*/}
      {/*              </Typography>*/}
      {/*            )}*/}
      {/*          </Stack>*/}
      {/*          {touched.password && errors.password && (*/}
      {/*            <FormHelperText errors id="standard-weight-helper-text-password-login">*/}
      {/*              {errors.password}*/}
      {/*            </FormHelperText>*/}
      {/*          )}*/}
      {/*        </Grid>*/}

      {/*        <Grid item xs={12} sx={{ mt: -1 }}>*/}
      {/*          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>*/}
      {/*            <FormControlLabel*/}
      {/*              control={*/}
      {/*                <Checkbox*/}
      {/*                  checked={checked}*/}
      {/*                  onChange={(event) => setChecked(event.target.checked)}*/}
      {/*                  name="checked"*/}
      {/*                  color="primary"*/}
      {/*                  size="small"*/}
      {/*                />*/}
      {/*              }*/}
      {/*              label={<Typography variant="h6">Keep me sign in</Typography>}*/}
      {/*            />*/}
      {/*            <NextLink href={'/forget-pass'} passHref legacyBehavior>*/}
      {/*              <Link variant="h6" color="text.primary">*/}
      {/*                Forgot Password?*/}
      {/*              </Link>*/}
      {/*            </NextLink>*/}
      {/*          </Stack>*/}
      {/*        </Grid>*/}
      {/*        {errors.submit && (*/}
      {/*          <Grid item xs={12}>*/}
      {/*            <FormHelperText errors>{errors.submit}</FormHelperText>*/}
      {/*          </Grid>*/}
      {/*        )}*/}
      {/*        <Grid item xs={12}>*/}
      {/*          <AnimateButton>*/}
      {/*            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">*/}
      {/*              Login*/}
      {/*            </Button>*/}
      {/*          </AnimateButton>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*    </form>*/}
      {/*  )}*/}
      {/*</Formik>*/}
      {/*<Divider sx={{ mt: 2 }}>*/}
      {/*  <Typography variant="caption"> Login with</Typography>*/}
      {/*</Divider>*/}
      {/*{providers && (*/}
      {/*  <Stack*/}
      {/*    direction="row"*/}
      {/*    spacing={matchDownSM ? 1 : 2}*/}
      {/*    justifyContent={matchDownSM ? 'space-around' : 'space-between'}*/}
      {/*    sx={{ mt: 3, '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}*/}
      {/*  >*/}
      {/*    {Object.values(providers).map((provider: any) => {*/}
      {/*      if (provider.id === 'login' || provider.id === 'register') {*/}
      {/*        return;*/}
      {/*      }*/}
      {/*      return (*/}
      {/*        <Box key={provider.name} sx={{ width: '100%' }}>*/}
      {/*          {provider.id === 'google' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Google} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Google'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*          {provider.id === 'auth0' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Auth0} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Auth0'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*          {provider.id === 'cognito' && (*/}
      {/*            <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="secondary"*/}
      {/*              fullWidth={!matchDownSM}*/}
      {/*              startIcon={<Image src={Cognito} alt="Twitter" width={16} height={16} />}*/}
      {/*              onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}*/}
      {/*            >*/}
      {/*              {!matchDownSM && 'Cognito'}*/}
      {/*            </Button>*/}
      {/*          )}*/}
      {/*        </Box>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Stack>*/}
      {/*)}*/}
      {/*{!providers && (*/}
      {/*  <Box sx={{ mt: 3 }}>*/}
      {/*    <FirebaseSocial />*/}
      {/*  </Box>*/}
      {/*)}*/}
    </>
  );
};

export default AuthLogin;
