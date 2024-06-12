// This is example of menus item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {BuildOutlined} from '@ant-design/icons';

// type
import { NavItemType } from '@Src/types/menu';

// icons
const icons = {
  BuildOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const classification: NavItemType = {
  id: 'classification-group',
  // title: <FormattedMessage id="product" />,
  type: 'group',
  children: [
    {
      id: 'classification',
      title: <FormattedMessage id="common.menu.classification.title" />,
      type: 'collapse',
      icon: icons.BuildOutlined,
      children: [
        {
          id: 'category ㅡ',
          title: <FormattedMessage id="common.menu.classification.category" />,
          type: 'item',
          url: '/category',
          target: false
        },
        {
          id: 'promotion',
          title: <FormattedMessage id="common.menu.classification.promotion" />,
          type: 'item',
          url: '/promotion',
          target: false
        }
      ],
    },
  ],
};

export default classification;
