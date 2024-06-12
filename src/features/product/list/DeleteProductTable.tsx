import {Box} from "@mui/material";
import ProductTable, {Product} from "@Src/components/tables/ProductTable";

export default function DeleteProductTable() {

  const regularPrice = '1500';
  const discount = '600';

  const data: Product[] = [
    {
      code: 'LM-A-001',
      name: 'Product1',
      imageUrl: '',
      regularPrice: Number(regularPrice).toLocaleString(),
      specialPrice: (Number(regularPrice) - Number(discount)).toLocaleString(),
      stock: '5',
      category: 'Category1',
      regDate: '02/28/2024',
      url: '',
      option: [
        {
          name: '오렌지, S',
          regularPrice: '',
          specialPrice: '',
          stock: '',
        },
        {
          name: '레드, M',
          regularPrice: '',
          specialPrice: '',
          stock: '',
        }
      ],
    }
  ];

  return <ProductTable data={data} />;
}