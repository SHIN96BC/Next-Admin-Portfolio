'use client';

// material-ui
import { Theme } from '@mui/material/styles';
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      {/*<Stack*/}
      {/*  direction={matchDownSM ? 'column' : 'row'}*/}
      {/*  justifyContent={matchDownSM ? 'center' : 'space-between'}*/}
      {/*  spacing={2}*/}
      {/*  textAlign={matchDownSM ? 'center' : 'inherit'}*/}
      {/*>*/}
      {/*  <Typography variant="subtitle2" color="secondary" component="span">*/}
      {/*    This site is protected by{' '}*/}
      {/*    <Typography component={Link} variant="subtitle2" href="#mantis-privacy" target="_blank" underline="hover">*/}
      {/*      Privacy Policy*/}
      {/*    </Typography>*/}
      {/*  </Typography>*/}

      {/*  <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>*/}
      {/*    <Typography*/}
      {/*      variant="subtitle2"*/}
      {/*      color="secondary"*/}
      {/*      component={Link}*/}
      {/*      href="https://codedthemes.com"*/}
      {/*      target="_blank"*/}
      {/*      underline="hover"*/}
      {/*    >*/}
      {/*      Terms and Conditions*/}
      {/*    </Typography>*/}
      {/*    <Typography*/}
      {/*      variant="subtitle2"*/}
      {/*      color="secondary"*/}
      {/*      component={Link}*/}
      {/*      href="https://codedthemes.com"*/}
      {/*      target="_blank"*/}
      {/*      underline="hover"*/}
      {/*    >*/}
      {/*      Privacy Policy*/}
      {/*    </Typography>*/}
      {/*    <Typography*/}
      {/*      variant="subtitle2"*/}
      {/*      color="secondary"*/}
      {/*      component={Link}*/}
      {/*      href="https://codedthemes.com"*/}
      {/*      target="_blank"*/}
      {/*      underline="hover"*/}
      {/*    >*/}
      {/*      CA Privacy Notice*/}
      {/*    </Typography>*/}
      {/*  </Stack>*/}
      {/*</Stack>*/}
      <Stack>
        <Typography
          variant="subtitle2"
          color="secondary"
          component={Link}
          href="https://codedthemes.com"
          target="_blank"
          underline="hover"
        >
          이미지 출처 <a href="https://kr.freepik.com/free-vector/multitasking-working-person-trying-to-solve-everything_6722463.htm#page=2&query=administrator&position=33&from_view=keyword&track=ais_user&uuid=29827258-454a-40a9-a340-f56b1618e2e1">Freepik</a>
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
