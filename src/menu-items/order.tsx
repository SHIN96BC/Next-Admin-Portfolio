// This is example of menus item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {BarsOutlined, ProfileOutlined} from '@ant-design/icons';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// type
import { NavItemType } from '@Src/types/menu';

// icons
const icons = {
  AssignmentOutlinedIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const order: NavItemType = {
  id: 'order-group',
  // title: <FormattedMessage id="product" />,
  type: 'group',
  children: [
    {
      id: 'order',
      title: <FormattedMessage id="common.menu.order.title" />,
      type: 'collapse',
      icon: icons.AssignmentOutlinedIcon,
      children: [
        {
          id: 'order-list',
          title: <FormattedMessage id="common.menu.order.orderList" />,
          type: 'item',
          url: '/order/list',
          target: false
        },
        {
          id: 'order-detail',
          title: <FormattedMessage id="common.menu.order.orderDetail" />,
          type: 'item',
          url: '/order/detail',
          target: false
        },
        {
          id: 'order-process',
          title: <FormattedMessage id="common.menu.order.orderProcess" />,
          type: 'item',
          url: '/order/process',
          target: false
        },
        {
          id: 'review',
          title: <FormattedMessage id="common.menu.order.review" />,
          type: 'item',
          url: '/review',
          target: false
        },
      ],
    },
  ],
};

export default order;
