// This is example of menus item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BarChartOutlined } from '@ant-design/icons';

// type
import { NavItemType } from '@Src/types/menu';

// icons
const icons = {
  BarChartOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard-page',
  title: <FormattedMessage id="common.menu.dashboardPage" />,
  type: 'group',
  url: '/dashboard',
  icon: icons.BarChartOutlined
};

export default dashboard;
