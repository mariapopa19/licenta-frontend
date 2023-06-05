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
import { adaugaFirma, deleteFirma, firmeAdmin, modificaFirma } from "../../api";
import { useConfirm } from "material-ui-confirm";
import * as yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";

const AdminTableFirme = () => {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const confirm = useConfirm();
  const handleCreateNewRow = async (values) => {
    try {
      const res = await adaugaFirma(
        values.denumire,
        values.data_inceput.format("DD/MM/YYYY"),
        values.data_finalizare.format("DD/MM/YYYY")
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
        data[row.index] = values;
        await modificaFirma(values.id, values.denumire, values.data_finalizare);
        fetchFirme();
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
        const res = await deleteFirma(row.original.id);
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
          let data_inceput;
          const isValid =
            cell.column.id === "data_inceput"
              ? (data_inceput = event.target.value)
              : cell.column.id === "data_sfarsit"
              ? validateDataSfarsit(event.target.value, data_inceput)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
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
        accessorFn: (row) => row.denumire,
        id: "denumire",
        type: "text",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        header: "Inceput Contract",
        accessorKey: "perioadaContractFirma.data_inceput",
        id: "data_inceput",
        type: "date",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
          disabled: true,
        }),
      },
      {
        header: "Sfarsit Contract",
        accessorKey: "perioadaContractFirma.data_finalizare",
        id: "data_finalizare",
        type: "date",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const fetchFirme = async () => {
    try {
      const res = await firmeAdmin();
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
    fetchFirme();
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
            Adauga o firma noua
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

  const validationSchema = yup.object({
    denumire: yup.string().required("Denumirea este obligatorie"),
    inceputContract: yup.date().required("Data de inceput este obligatorie"),
    sfarsitContract: yup
      .date()
      .min(
        yup.ref("inceputContract"),
        "Te rog sa alegi o data mai mare decat data de inceput contract"
      )
      .required("Data de sfarsit este obligatorie"),
  });

  const formik = useFormik({
    initialValues: {
      denumire: "",
      inceputContract: dayjs().format('YYYY-MM-DD'),
      sfarsitContract: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Adauga o firma noua</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              display: "flex",
              alignItems: "flex-start",
              my: "0.5rem",
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              fullWidth
              key="denumire"
              label="Denumire"
              name="denumire"
              value={formik.values.denumire}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.denumire && formik.errors.denumire}
              error={formik.touched.denumire && Boolean(formik.errors.denumire)}
            />
            <TextField
              fullWidth
              type="date"
              key="inceputContract"
              label="Data Inceput Contract"
              name="inceputContract"
              value={formik.values.inceputContract}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.inceputContract && formik.errors.inceputContract}
              error={formik.touched.inceputContract && Boolean(formik.errors.inceputContract)}
            /> 
            <TextField
              fullWidth
              type="date"
              key="sfarsitContract"
              label="Data Sfarsit Contract"
              name="sfarsitContract"
              value={formik.values.sfarsitContract}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.sfarsitContract && formik.errors.sfarsitContract}
              error={formik.touched.sfarsitContract && Boolean(formik.errors.sfarsitContract)}
            />
            
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" type="submit" variant="contained">
          Creaza Firma Noua
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateDataSfarsit = (data_sfarsit, data_inceput) =>
  (data_sfarsit = data_inceput || data_sfarsit < data_inceput);

export default AdminTableFirme;
