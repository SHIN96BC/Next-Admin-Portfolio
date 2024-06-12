'use client'

import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {AccountCircle, Send} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useMemo, useState} from "react";
import {lighten} from "@mui/system";
import Menu from "@mui/material/Menu";
import {FormattedMessage, useIntl} from "react-intl";
import useConfig from "@Src/hooks/useConfig";


export type Product = {
  code?: string;
  name: string;
  imageUrl?: string;
  regularPrice: string;
  specialPrice: string;
  stock: string;
  category?: string;
  regDate?: string;
  url?: string;
  option?: Product[];
};

type Props = {
  data: Product[];
}

export default function ProductTable({ data }: Props) {
  const { i18n } = useConfig();
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isActionOpen = Boolean(anchorEl);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setAnchorEl(null);
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        id: 'table', //id used to define `group` column
        header: '',
        columns: [
          {
            accessorKey: 'code', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.productCode'
            }),
            size: 250,
          },
          {
            accessorFn: (row) => row.name, //accessorFn used to join multiple data into a single cell
            id: 'product-name', //id is still required when using accessorFn instead of accessorKey
            header: intl.formatMessage({
              id: 'productList.table.header.productNameEn'
            }),
            enableColumnActions: false,
            size: 300,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{

                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {
                  row.original.imageUrl &&
                  <img
                    alt="product-image"
                    width={100}
                    height={70}
                    src={row.original.imageUrl}
                    loading="lazy"
                    // style={{ borderRadius: '50%' }}
                  />
                }
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'regularPrice', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.regularPrice'
            }),
            size: 300,
          },
          {
            accessorKey: 'specialPrice', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.specialPrice'
            }),
            size: 300,
          },
          {
            accessorKey: 'stock', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.stock'
            }),
            size: 300,
          },
          {
            accessorKey: 'category', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.categoryEn'
            }),
            size: 300,
          },
          {
            accessorKey: 'regDate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            // filterVariant: 'autocomplete',
            header: intl.formatMessage({
              id: 'productList.table.header.regDate'
            }),
            size: 300,
          },
        ],
      },
      // {
      //   id: 'id',
      //   header: 'Job Info',
      //   columns: [
      //     {
      //       accessorKey: 'salary',
      //       // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      //       filterFn: 'between',
      //       header: 'Salary',
      //       size: 200,
      //       //custom conditional format and styling
      //       Cell: ({ cell }) => (
      //         <Box
      //           component="span"
      //           sx={(theme) => ({
      //             backgroundColor:
      //               cell.getValue<number>() < 50_000
      //                 ? theme.palette.error.dark
      //                 : cell.getValue<number>() >= 50_000 &&
      //                 cell.getValue<number>() < 75_000
      //                   ? theme.palette.warning.dark
      //                   : theme.palette.success.dark,
      //             borderRadius: '0.25rem',
      //             color: '#fff',
      //             maxWidth: '9ch',
      //             p: '0.25rem',
      //           })}
      //         >
      //           {cell.getValue<number>()?.toLocaleString?.('en-US', {
      //             style: 'currency',
      //             currency: 'USD',
      //             minimumFractionDigits: 0,
      //             maximumFractionDigits: 0,
      //           })}
      //         </Box>
      //       ),
      //     },
      //     {
      //       accessorKey: 'jobTitle', //hey a simple column for once
      //       header: 'Job Title',
      //       size: 350,
      //     },
      //     {
      //       accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
      //       id: 'startDate',
      //       header: 'Start Date',
      //       filterVariant: 'date',
      //       filterFn: 'lessThan',
      //       sortingFn: 'datetime',
      //       Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
      //       Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      //       muiFilterTextFieldProps: {
      //         sx: {
      //           minWidth: '250px',
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
    [i18n],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: true,
    // enableGrouping: true,
    // enableColumnPinning: true,
    // enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: (row) => !!row.original.code,
    enableExpanding: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ['mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    // muiSearchTextFieldProps: {
    //   size: 'small',
    //   variant: 'outlined',
    // },
    muiPaginationProps: {
      color: 'primary',
      rowsPerPageOptions: [10, 20, 30],
      // count: 5,
      shape: 'circular',
      variant: 'contained',
    },
    enableSubRowSelection: false,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        // header: 'Management', //change header text
        header: intl.formatMessage({
          id: 'productList.table.header.management'
        }),
        // size: 300, //make actions column wider
        muiTableHeadCellProps: {
          align: 'right',
        },
        muiTableBodyCellProps: {
          align: 'center',
        }
      },
    },

    getSubRows: (row) => row.option,
    // renderDetailPanel: ({ row }) => (
    //   <Box
    //     sx={{
    //       alignItems: 'center',
    //       display: 'flex',
    //       justifyContent: 'space-around',
    //       left: '30px',
    //       maxWidth: '1000px',
    //       position: 'sticky',
    //       width: '100%',
    //     }}
    //   >
    //     <img
    //       alt="avatar"
    //       height={200}
    //       src={row.original.imageUrl}
    //       loading="lazy"
    //       style={{ borderRadius: '50%' }}
    //     />
    //     <Box sx={{ textAlign: 'center' }}>
    //       <Typography variant="h4">Signature Catch Phrase:</Typography>
    //       <Typography variant="h1">
    //         &quot;{row.original.signatureCatchPhrase}&quot;
    //       </Typography>
    //     </Box>
    //   </Box>
    // ),
    renderRowActions: ({cell, row, table, staticRowIndex}) => (
      <Box>
        {
          row.original.code &&
          <>
            <Button
              aria-label="more"
              id="long-button"
              aria-controls={isActionOpen ? 'long-menus' : undefined}
              aria-expanded={isActionOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleActionClick}
            >
              <FormattedMessage id="productList.table.button.edit" />
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={isActionOpen}
              onClose={handleActionClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={handleActionClose}>
                <FormattedMessage id="productList.table.button.copy" />
              </MenuItem>
              <MenuItem onClick={handleActionClose}>
                <FormattedMessage id="productList.table.button.delete" />
              </MenuItem>
            </Menu>
          </>
        }

        {/*{*/}
        {/*  // row.original.code && <Button onClick={() => table.setShowColumnFilters(true)}>Edit</Button>*/}
        {/*  row.original.code && <Button>Edit</Button>*/}
        {/*}*/}
      </Box>
    ),
    // renderRowActionMenuItems: ({ closeMenu }) => [
    //   <MenuItem
    //     key={0}
    //     onClick={() => {
    //       // View profile logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <AccountCircle />
    //     </ListItemIcon>
    //     View Profile
    //   </MenuItem>,
    //   <MenuItem
    //     key={1}
    //     onClick={() => {
    //       // Send email logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <Send />
    //     </ListItemIcon>
    //     Send Email
    //   </MenuItem>,
    // ],
    renderTopToolbar: ({ table }) => {
      const handleDelete = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('delete ' + row.getValue('name'));
        });
      };

      const handleCopy = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleChangeCategory = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/*  /!* import MRT sub-components *!/*/}
          {/*  <MRT_GlobalFilterTextField table={table} />*/}
          {/*  <MRT_ToggleFiltersButton table={table} />*/}
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDelete}
                variant="contained"
              >
                <FormattedMessage id="productList.table.button.delete" />
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleCopy}
                variant="contained"
              >
                <FormattedMessage id="productList.table.button.copy" />
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleChangeCategory}
                variant="contained"
              >
                <FormattedMessage id="productList.table.button.changeCategory" />
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });


  return <MaterialReactTable table={table} />;
}