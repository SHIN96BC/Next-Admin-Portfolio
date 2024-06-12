// This is example of menus item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {RocketOutlined} from '@ant-design/icons';

// type
import { NavItemType } from '@Src/types/menu';

// icons
const icons = {
  RocketOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const delivery: NavItemType = {
  id: 'delivery-group',
  // title: <FormattedMessage id="delivery" />,
  type: 'group',
  children: [
    {
      id: 'delivery',
      title: <FormattedMessage id="common.menu.delivery.title" />,
      type: 'collapse',
      icon: icons.RocketOutlined,
      children: [
        {
          id: 'delivery-settings',
          title: <FormattedMessage id="common.menu.delivery.deliverySettings" />,
          type: 'item',
          url: '/delivery/settings',
          target: false
        },
        {
          id: 'deliveryList.json',
          title: <FormattedMessage id="common.menu.delivery.deliveryList" />,
          type: 'item',
          url: '/delivery/list',
          target: false
        }
      ],
    },
  ],
};

export default delivery;
