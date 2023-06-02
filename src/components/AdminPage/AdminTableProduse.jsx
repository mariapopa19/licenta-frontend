/* eslint-disable no-useless-escape */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  adaugaProdus,
  categoriiAdmin,
  deleteProdus,
  firmeAdmin,
  modificaProdus,
  produseAdmin,
} from "../../api";
import { useConfirm } from "material-ui-confirm";

const AdminTableProduse = () => {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [firme, setFirme] = useState([]);
  const [categorii, setCategorii] = useState([]);

  const confirm = useConfirm();

  const handleCreateNewRow = async (values) => {
    console.log(values);
    console.log(
      values.denumire,
      values.pret,
      values.categorie,
      values.descriere,
      values.imageURL,
      values.firma
    );
    try {
      const res = await adaugaProdus(
        values.denumire,
        values.pret,
        values.categorie,
        values.descriere,
        values.imageURL,
        values.firma
      );
      console.log(res);
      data.push(res);
      setData([...data]);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      if (!Object.keys(validationErrors).length) {
        console.log(values);
        data[row.index] = values;
        const res = await modificaProdus(
          values.id,
          values.denumire,
          values.pret,
          values.descriere,
          values.imageURL
        );
        //send/receive api updates here, then refetch or update local table data for re-render
        setData([...res]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      try {
        await confirm({
          description: `This will permanently delete ${row.original.denumire}.`,
        });
        const res = await deleteProdus(row.original.id);
        data.splice(row.index, 1);
        setData([...res]);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    },
    [data, confirm]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "pret"
              ? validatePret(+event.target.value)
              : cell.column.id === "imageURL"
              ? validateURL(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            cell.column.id === "pret"
              ? setValidationErrors({
                  ...validationErrors,
                  [cell.id]: `${cell.column.columnDef.header} trebuie sa fie mai mare decat 1`,
                })
              : cell.column.id === "imageURL"
              ? setValidationErrors({
                  ...validationErrors,
                  [cell.id]: `${cell.column.columnDef.header} trebuie sa fie URL`,
                })
              : setValidationErrors({
                  ...validationErrors,
                  [cell.id]: `${cell.column.columnDef.header} este obligatoriu`,
                });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const dropDown = async () => {
    const firme = await firmeAdmin();
    setFirme(firme);
    const categorii = await categoriiAdmin();
    setCategorii(categorii);
  };

  const columns = useMemo(
    () => [
      {
        header: "Id",
        accessorKey: "id",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          disabled: true,
        }),
      },
      {
        header: "Denumire",
        accessorKey: "denumire",
        multiline: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Pret",
        accessorKey: "pret",
        multiline: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        header: "Image URL",
        accessorKey: "imageURL",
        multiline: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "url",
        }),
      },
      {
        header: "Descriere",
        accessorKey: "descriere",
        multiline: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          multiline: true,
          maxRows: 4,
        }),
      },
      {
        header: "Categorie",
        accessorKey: "categorieProdus.denumire",
        id: "categorie",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
      {
        header: "Firma",
        accessorKey: "firma.denumire",
        id: "firma",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const fetchProduse = async () => {
    try {
      const res = await produseAdmin();
      // console.log(res);
      setData(res);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    fetchProduse();
    dropDown();
  }, []);

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        onPaginationChange={setPagination}
        state={{ pagination }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        columns={columns}
        data={data}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Creaza produs nou
          </Button>
        )}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
      />
      <CreateNewProductModal
        columns={columns.slice(1)}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        categorii={categorii}
        firme={firme}
      />
    </>
  );
};
export const CreateNewProductModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  categorii,
  firme,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [firmaState, setFirmaState] = useState("");
  const [categorieState, setCategorieState] = useState("");

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Creaza produs nou</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              my: "0.5rem",
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) =>
              column.id === "firma" ? (
                <FormControl fullWidth>
                  <InputLabel id="firma">Firma</InputLabel>
                  <Select
                    id="firma"
                    label="Firma"
                    name={column.id}
                    value={firmaState}
                    onChange={(e) => {
                      setFirmaState(e.target.value);
                      setValues({ ...values, [e.target.name]: e.target.value });
                    }}
                  >
                    {firme.map((firma) => (
                      <MenuItem value={firma.denumire}>
                        {firma.denumire}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : column.id === "categorie" ? (
                <FormControl fullWidth>
                  <InputLabel id="categorie">Categorie</InputLabel>
                  <Select
                    id="categorie"
                    label="Categorie"
                    name={column.id}
                    value={categorieState}
                    onChange={(e) => {
                      setCategorieState(e.target.value);
                      setValues({ ...values, [e.target.name]: e.target.value });
                    }}
                  >
                    {categorii.map((categorie) => (
                      <MenuItem value={categorie.denumire}>
                        {categorie.denumire}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.id}
                  multiline={column.multiline}
                  maxRows={4}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              )
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Creaza Produs Nou
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validatePret = (pret) => pret >= 1;
const validateURL = (imageURL) =>
  imageURL.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  );

export default AdminTableProduse;
