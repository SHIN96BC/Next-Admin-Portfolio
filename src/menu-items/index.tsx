// project import
import delivery from "@Src/menu-items/delivery";
import product from "@Src/menu-items/product";
import classification from "@Src/menu-items/classification";
import order from "@Src/menu-items/order";
import dashboard from "@Src/menu-items/dashboard";

// types
import { NavItemType } from '@Src/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [dashboard, product, classification, order, delivery],
};

export default menuItems;
