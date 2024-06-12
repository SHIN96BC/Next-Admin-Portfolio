import MainCard from "@Src/components/common/cards/MainCard";
import {Box} from "@mui/material";
import ProductList from "@Src/features/product/list/ProductList";

export default function ProductListViewPage() {
  return (
    <MainCard>
      <ProductList />
    </MainCard>
  );
}