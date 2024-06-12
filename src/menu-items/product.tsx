// This is example of menus item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {ShopOutlined} from '@ant-design/icons';

// type
import { NavItemType } from '@Src/types/menu';

// icons
const icons = {
  ShopOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const product: NavItemType = {
  id: 'product-group',
  // title: <FormattedMessage id="product" />,
  type: 'group',
  children: [
    {
      id: 'product',
      title: <FormattedMessage id="common.menu.product.title" />,
      type: 'collapse',
      icon: icons.ShopOutlined,
      children: [
        {
          id: 'product-list',
          title: <FormattedMessage id="common.menu.product.productList" />,
          type: 'item',
          url: '/product/list',
          target: false
        },
        {
          id: 'product-add',
          title: <FormattedMessage id="common.menu.product.productAdd" />,
          type: 'item',
          url: '/product/add',
          target: false
        }
      ],
    },
  ],
};

export default product;
