import {ChangeEvent, useMemo, useState} from "react";
import {MaterialReactTable, MRT_ColumnDef, useMaterialReactTable} from "material-react-table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {AccountCircle, Send} from "@mui/icons-material";
import {lighten} from "@mui/system";
import Switch from "@mui/material/Switch";
import {FormattedMessage} from "react-intl";

export type Option = {
  option1?: string;
  option2: string;
  optionPrice: string;
  specialPrice: string;
  stock: string;
  availability?: boolean;
};

type Props = {
  optionName1: string;
  optionName2?: string;
  data: Option[];
  handleChangeAvailability?: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: (index: number) => void;
}

const validateRequired = (value: string) => !!value.length;

export default function OptionTable({ optionName1, optionName2, data, handleDelete, handleChangeAvailability }: Props) {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const isActionOpen = Boolean(anchorEl);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedOptions, setEditedOptions] = useState<Record<string, any>>({});

  // const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleActionClose = () => {
  //   setAnchorEl(null);
  // };

  const columns = useMemo<MRT_ColumnDef<Option>[]>(
    () => [
      {
        id: 'nameTable', //id used to define `group` column
        header: 'Option Name',
        columns: [
          {
            accessorKey: 'option1', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            enableSorting: false,
            enableEditing: false,
            // filterVariant: 'autocomplete',
            header: optionName1,
            size: 200,
          },
          {
            accessorKey: 'option2',
            enableClickToCopy: true,
            enableColumnActions: false,
            enableSorting: false,
            enableEditing: false,
            // filterVariant: 'autocomplete',
            header: optionName2 || '',
            size: 200,
            enableHiding: !optionName2,
          }
        ],
      },
      {
        id: 'table',
        header: '',
        columns: [
          {
            accessorKey: 'optionPrice', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            enableSorting: false,
            // filterVariant: 'autocomplete',
            header: 'Option Price',
            size: 200,
            muiEditTextFieldProps: ({ cell, row }) => ({
              type: 'text',
              required: true,
              error: !!validationErrors?.[cell.id],
              helperText: validationErrors?.[cell.id],
              //store edited user in state to be saved later
              onBlur: (event) => {
                console.log('row.id = ', row.id);
                console.log('row.original = ', row.original);
                console.log('cell.id = ', cell.id);
                const validationError = !validateRequired(event.currentTarget.value)
                  ? 'Required'
                  : undefined;
                setValidationErrors({
                  ...validationErrors,
                  [cell.id]: validationError,
                });
                setEditedOptions({ ...editedOptions, [row.id]: { ...row.original, optionPrice: event.currentTarget.value } });
              },
            }),
          },
          {
            accessorKey: 'specialPrice', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            enableSorting: false,
            enableEditing: false,
            // filterVariant: 'autocomplete',
            header: 'Special Price',
            size: 200,
          },
          {
            accessorKey: 'stock', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableColumnActions: false,
            enableSorting: false,
            // filterVariant: 'autocomplete',
            header: 'Stock',
            size: 200,
          },
          {
            // accessorKey: 'availability', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            // enableClickToCopy: true,
            // enableColumnActions: false,
            // enableSorting: false,
            // // filterVariant: 'autocomplete',
            // header: 'Availability',
            // size: 300,
            id: 'availability', //id is still required when using accessorFn instead of accessorKey
            header: 'Availability',
            enableColumnActions: false,
            enableEditing: false,
            size: 200,
            Cell: ({ renderedCellValue, row, table }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                {/*<Switch checked={row.original.availability} onChange={row.original.handleChangeAvailability} />*/}
                <Switch
                  checked={row.original.availability}
                  onChange={(event) => {
                    if (handleChangeAvailability) handleChangeAvailability(row.index, event)
                  }}
                />
              </Box>
            ),
          },
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    // enableGrouping: true,
    // enableColumnPinning: true,
    // enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    // enableRowSelection: (row) => !!row.original.code,
    enableExpanding: false,
    enableEditing: true,
    editDisplayMode: 'cell',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ['mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    enablePagination: false,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    // muiSearchTextFieldProps: {
    //   size: 'small',
    //   variant: 'outlined',
    // },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    enableSubRowSelection: false,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Management', //change header text
        // size: 300, //make actions column wider
        muiTableHeadCellProps: {
          align: 'right',
        },
        muiTableBodyCellProps: {
          align: 'center',
        }
      },
    },

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
        <Button aria-label="option-delete" id="option-delete-button">
          <FormattedMessage id="productAdd.optionSetting.table.button.delete" />
        </Button>
        {/*<>*/}
        {/*  <Button*/}
        {/*    aria-label="more"*/}
        {/*    id="long-button"*/}
        {/*    aria-controls={isActionOpen ? 'long-menus' : undefined}*/}
        {/*    aria-expanded={isActionOpen ? 'true' : undefined}*/}
        {/*    aria-haspopup="true"*/}
        {/*    onClick={handleActionClick}*/}
        {/*  >*/}
        {/*    Edit*/}
        {/*  </Button>*/}
        {/*  <Menu*/}
        {/*    id="long-menus"*/}
        {/*    MenuListProps={{*/}
        {/*      'aria-labelledby': 'long-button',*/}
        {/*    }}*/}
        {/*    anchorEl={anchorEl}*/}
        {/*    open={isActionOpen}*/}
        {/*    onClose={handleActionClose}*/}
        {/*    PaperProps={{*/}
        {/*      style: {*/}
        {/*        maxHeight: 48 * 4.5,*/}
        {/*        width: '20ch',*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <MenuItem onClick={handleActionClose}>*/}
        {/*      Copy*/}
        {/*    </MenuItem>*/}
        {/*    <MenuItem onClick={handleActionClose}>*/}
        {/*      Delete*/}
        {/*    </MenuItem>*/}
        {/*  </Menu>*/}
        {/*</>*/}

        {/*{*/}
        {/*  // row.original.code && <Button onClick={() => table.setShowColumnFilters(true)}>Edit</Button>*/}
        {/*  row.original.code && <Button>Edit</Button>*/}
        {/*}*/}
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        console.log('table = ', table);
        table.getSelectedRowModel().flatRows.map((row) => {
          console.log('row = ', row);
          if (handleDelete) handleDelete(row.index);
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
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
                onClick={handleDeactivate}
                variant="contained"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}