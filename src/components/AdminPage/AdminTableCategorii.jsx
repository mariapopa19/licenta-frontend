import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { adaugaCategorie, categoriiAdmin, deleteCategorie, modificaCategorie } from "../../api";
import { useConfirm } from "material-ui-confirm";

const AdminTableCategorii = () => {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const confirm = useConfirm();
  const handleCreateNewRow = async (values) => {
    try {
      const res = await adaugaCategorie(values.denumire);
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
        const res = await modificaCategorie(values.id, values.denumire);
        //send/receive api updates here, then refetch or update local table data for re-render
        setData([res]);
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
      await confirm({ description: `This will permanently delete ${row.original.denumire}.` })
      const res = await deleteCategorie(row.original.id);
      data.splice(row.index, 1);
      setData([...res]);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  },
  [data, confirm])

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
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
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const fetchCatgorii = async () => {
    try {
      const res = await categoriiAdmin();
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
    fetchCatgorii();
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
            Adauga o categorie noua
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
      <CreateNewModal
        columns={columns.slice(1)}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};
export const CreateNewModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Adauga o categorie noua</DialogTitle>
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
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.id}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Creaza O Categorie Noua
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default AdminTableCategorii;
