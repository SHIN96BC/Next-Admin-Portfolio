'use client';

import { SyntheticEvent, useEffect, useState } from 'react';

// next
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { signIn } from 'next-auth/react';
import {useRouter} from "next/navigation";

// material-ui
import { Theme } from '@mui/material/styles';
import {
  Box,
  useMediaQuery,
  Button,
  Divider,
  FormHelperText,
  FormControl,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

// project import
import FirebaseSocial from './FirebaseSocial';
import IconButton from '@Src/components/@extended/IconButton';
import AnimateButton from '@Src/components/@extended/AnimateButton';
import { APP_DEFAULT_PATH } from '@Src/config';

// validation
import { strengthColor, strengthIndicator } from '@Src/validation/password-strength';
import {signUpSchema, SignUpSchemaType} from "@Src/validation/schema/auth";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// types
import { StringColorProps } from '@Src/types/password';


const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthRegister = ({ providers, csrfToken }: any) => {
  const router = useRouter();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting
    },
    setError,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await signIn('register', {
        redirect: false,
        name: values.name,
        email: values.email,
        password: values.password,
        callbackUrl: APP_DEFAULT_PATH
      });

      if (res?.error) {
        setError('submit', { type: 'manual', message: res.error });
      } else {
        router.push(APP_DEFAULT_PATH);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('submit', { type: 'manual', message: error.message });
      } else {
        setError('submit', { type: 'manual', message: 'An unknown error occurred' });
      }
    }
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name-login">Name</InputLabel>
              <OutlinedInput
                {...register('name')}
                id="name-login"
                type="text"
                name="name"
                placeholder="Enter your name"
                fullWidth
                error={Boolean(errors.name)}
              />
            </Stack>
            {errors.name && (
              <FormHelperText error id="standard-weight-helper-text-name-login">
                {errors.name.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                {...register('email')}
                id="email-login"
                type="email"
                name="email"
                placeholder="Enter email address"
                fullWidth
                error={Boolean(errors.email)}
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
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                      field.onChange(e);
                      changePassword(e.target.value);
                    }}
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
                )}
              />
            </Stack>
            {errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password.message}
              </FormHelperText>
            )}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Typography variant="body2">
              By Signing up, you agree to our &nbsp;
              <NextLink href="/" passHref legacyBehavior>
                <Link variant="subtitle2">Terms of Service</Link>
              </NextLink>
              &nbsp; and &nbsp;
              <NextLink href="/" passHref legacyBehavior>
                <Link variant="subtitle2">Privacy Policy</Link>
              </NextLink>
            </Typography>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit.message}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Create Account
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>

      <Divider sx={{ mt: 2 }}>
        <Typography variant="caption"> Sign up with</Typography>
      </Divider>

      {providers && (
        <Stack
          direction="row"
          spacing={matchDownSM ? 1 : 2}
          justifyContent={matchDownSM ? 'space-around' : 'space-between'}
          sx={{ mt: 3, '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
        >
          {Object.values(providers).map((provider: any) => {
            if (provider.id === 'login' || provider.id === 'register') {
              return;
            }
            return (
              <Box key={provider.name} sx={{ width: '100%' }}>
                {provider.id === 'google' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!matchDownSM}
                    startIcon={<Image src={Google} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!matchDownSM && 'Google'}
                  </Button>
                )}
                {provider.id === 'auth0' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!matchDownSM}
                    startIcon={<Image src={Auth0} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!matchDownSM && 'Auth0'}
                  </Button>
                )}
                {provider.id === 'cognito' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!matchDownSM}
                    startIcon={<Image src={Cognito} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!matchDownSM && 'Cognito'}
                  </Button>
                )}
              </Box>
            );
          })}
        </Stack>
      )}
      {!providers && (
        <Box sx={{ mt: 3 }}>
          <FirebaseSocial />
        </Box>
      )}
    </>
  );
};

export default AuthRegister;
