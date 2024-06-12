// material-ui
import { Grid, Link, Stack, Typography, Box } from '@mui/material';

// project import
import AuthWrapper from '@Src/features/auth/AuthWrapper';
import AuthLogin from '@Src/features/auth/forms/AuthLogin';
import LogoMain from "@Src/components/common/logo/LogoMain";

export default async function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" py={2}>
            <LogoMain />
          </Box>
          {/*<Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>*/}
          {/*  <Typography variant="h3">Login</Typography>*/}
            {/*<NextLink href="/register" passHref legacyBehavior>*/}
            {/*  <Link variant="body1" color="primary">*/}
            {/*    Don&apos;t have an account?*/}
            {/*  </Link>*/}
            {/*</NextLink>*/}
          {/*</Stack>*/}
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
