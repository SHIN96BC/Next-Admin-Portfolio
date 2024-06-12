'use client';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

// project import
import useScriptRef from '@Src/hooks/useScriptRef';
import AnimateButton from '@Src/components/@extended/AnimateButton';
import useSnackbar from "@Src/hooks/store/useSnackbar";

// validation
import {forgotPwSchema, ForgotPwSchemaType} from "@Src/validation/schema/auth";

// types
import { SnackbarProps } from '@Src/types/snackbar';


// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef();
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

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
  } = useForm<ForgotPwSchemaType>({
    resolver: zodResolver(forgotPwSchema),
    defaultValues: {
      email: '',
    },
  });

  const watchEmail = useWatch({
    name: 'email',
    control,
  });

  const isSubmitDisabled = !!watchEmail && (!errors.email && !errors.submit);

  const onSubmit: SubmitHandler<ForgotPwSchemaType> = async (values) => {
    try {
      openSnackbar({
        open: true,
        message: 'Check mail for reset password link',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);

      setTimeout(() => {
        router.push('/check-mail');
      }, 1500);
    } catch (error) {
      // 에러 처리 로직
      if (error instanceof Error) {
        setError('submit', { type: 'manual', message: error.message });
      } else {
        setError('submit', { type: 'manual', message: 'An unknown error occurred' });
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
            <OutlinedInput
              {...register('email')}
              fullWidth
              error={Boolean(errors.email)}
              id="email-forgot"
              type="email"
              name="email"
              placeholder="Enter email address"
              inputProps={{}}
            />
          </Stack>
          {errors.email && (
            <FormHelperText error id="helper-text-email-forgot">
              {errors.email.message}
            </FormHelperText>
          )}
        </Grid>
        {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit.message}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12} sx={{ mb: -2 }}>
          <Typography variant="caption">Do not forgot to check SPAM box.</Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation disabled={isSubmitDisabled} fullWidth size="large" type="submit" variant="contained" color="primary">
              Send Password Reset Email
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthForgotPassword;
