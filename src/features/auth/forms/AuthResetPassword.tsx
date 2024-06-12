'use client';

import { useEffect, useState, SyntheticEvent } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
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
import IconButton from '@Src/components/@extended/IconButton';
import AnimateButton from '@Src/components/@extended/AnimateButton';
import useSnackbar from "@Src/hooks/store/useSnackbar";
import useScriptRef from '@Src/hooks/useScriptRef';

// validation
import { strengthColor, strengthIndicator } from '@Src/validation/password-strength';
import {passwordConfirmSchema, PasswordConfirmSchemaType} from "@Src/validation/schema/auth";

// types
import { SnackbarProps } from '@Src/types/snackbar';
import { StringColorProps } from '@Src/types/password';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthResetPassword = () => {
  const scriptedRef = useScriptRef();
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

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
    setValue,
    setError
  } = useForm<PasswordConfirmSchemaType>({
    resolver: zodResolver(passwordConfirmSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
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

  const onSubmit: SubmitHandler<FieldValues> = async ({ password, passwordConfirm}) => {
    try {
      // password reset
    } catch (error) {
      console.error(error);
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
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-reset">Password</InputLabel>
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
            <FormHelperText error id="helper-text-password-reset">
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
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-confirm-reset">Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(errors.passwordConfirm)}
              id="password-confirm-reset"
              type="password"
              name="passwordConfirm"
              placeholder="Enter confirm password"
            />
          </Stack>
          {errors.passwordConfirm && (
            <FormHelperText error id="helper-text-confirm-password-reset">
              {errors.passwordConfirm.message}
            </FormHelperText>
          )}
        </Grid>

        {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit.message}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthResetPassword;
