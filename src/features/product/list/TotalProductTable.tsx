import ProductTable, {Product} from "@Src/components/tables/ProductTable";

export default function TotalProductTable() {
  const regularPrice1 = '1500';
  const regularPrice2 = '1800';
  const discount = '600';

  const data: Product[] = [
    {
      code: 'LM-A-001',
      name: 'Product1',
      imageUrl: '/assets/test/test-product1.jpeg',
      regularPrice: `Min(${Number(regularPrice1).toLocaleString()}) ~ Max(${Number(regularPrice2).toLocaleString()}})`,
      specialPrice: `Min(${(Number(regularPrice1) - Number(discount)).toLocaleString()}) ~ Max(${(Number(regularPrice2) - Number(discount)).toLocaleString()})`,
      stock: '5',
      category: 'Category1',
      regDate: '02/28/2024',
      url: '',
      option: [
        {
          name: '오렌지, S',
          regularPrice: Number(regularPrice1).toLocaleString(),
          specialPrice: (Number(regularPrice1) - Number(discount)).toLocaleString(),
          stock: '3',
        },
        {
          name: '레드, M',
          regularPrice: Number(regularPrice1).toLocaleString(),
          specialPrice: (Number(regularPrice2) - Number(discount)).toLocaleString(),
          stock: '2',
        },
      ],
    },
    {
      code: 'LM-A-002',
      name: 'Product2',
      imageUrl: '/assets/test/test-product2.jpeg',
      regularPrice: Number(regularPrice1).toLocaleString(),
      specialPrice: (Number(regularPrice1) - Number(discount)).toLocaleString(),
      stock: '5',
      category: 'Category1',
      regDate: '02/28/2024',
      url: '',
    },
    {
      code: 'LM-A-003',
      name: 'Product3',
      imageUrl: '/assets/test/test-product3.jpg',
      regularPrice: `Min(${Number(regularPrice1).toLocaleString()}) ~ Max(${Number(regularPrice2).toLocaleString()}})`,
      specialPrice: `Min(${(Number(regularPrice1) - Number(discount)).toLocaleString()}) ~ Max(${(Number(regularPrice2) - Number(discount)).toLocaleString()})`,
      stock: '5',
      category: 'Category1',
      regDate: '02/28/2024',
      url: '',
      option: [
        {
          name: '오렌지, S',
          regularPrice: Number(regularPrice1).toLocaleString(),
          specialPrice: (Number(regularPrice1) - Number(discount)).toLocaleString(),
          stock: '3',
        },
        {
          name: '레드, M',
          regularPrice: Number(regularPrice1).toLocaleString(),
          specialPrice: (Number(regularPrice2) - Number(discount)).toLocaleString(),
          stock: '2',
        }
      ],
    },
  ];

  return <ProductTable data={data} />;
}