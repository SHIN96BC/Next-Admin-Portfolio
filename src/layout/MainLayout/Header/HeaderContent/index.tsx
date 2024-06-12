// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// project import
import Search from './Search';
import Message from './Message';
import Profile from './Profile';
import FullScreen from './FullScreen';
import Notification from './Notification';
import MobileSection from './MobileSection';

import useConfig from '@Src/hooks/useConfig';
import DrawerHeader from '@Src/layout/MainLayout/Drawer/DrawerHeader';

// type
import { MenuOrientation } from '@Src/types/config';
import Customization from "@Src/layout/MainLayout/Header/HeaderContent/Customization";
import {useMemo} from "react";
import Localization from "@Src/layout/MainLayout/Header/HeaderContent/Localization";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { i18n, menuOrientation } = useConfig();

  const localization = useMemo(() => <Localization />, [i18n]);

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {localization}

      <Notification />
      <Message />
      {!downLG && <FullScreen />}
      {/*<Customization />*/}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
