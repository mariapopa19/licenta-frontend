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
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  actualizareUtilizator,
  creazaUtilizatorAdmin,
  stergereUtilizator,
  utilizatoriAdmin,
} from "../../api";
import { useConfirm } from "material-ui-confirm";
import * as yup from "yup";
import { useFormik } from "formik";

const AdminTableUsers = () => {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const confirm = useConfirm();

  const handleCreateNewRow = async (values) => {
    console.log(values);

    try {
      const res = await creazaUtilizatorAdmin(
        values.email,
        values.parola,
        values.nume,
        values.admin,
        values.curier
      );
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
        const res = await actualizareUtilizator(
          values.id,
          values.email,
          values.nume
        );
        setData([...res]);
        exitEditingMode();
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
        const res = await stergereUtilizator(row.original.id);
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
              : validateRequired(event.target.value);
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
        header: "Nume",
        accessorKey: "nume",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Email",
        accessorKey: "email",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Curier",
        accessorKey: "curier",
        Cell: ({ cell }) => <span>{cell.getValue().toString()}</span>,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          disabled: true,
        }),
      },
      {
        header: "Admin",
        accessorKey: "admin",
        Cell: ({ cell }) => <span>{cell.getValue().toString()}</span>,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          disabled: true,
        }),
      },
      {
        header: "Parola",
        accessorKey: "parola",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const fetchUtilizatori = async () => {
    try {
      const res = await utilizatoriAdmin();
      //   console.log(res);
      setData(res);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
  };

  useEffect(() => {
    fetchUtilizatori();
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
            Creaza utilizator
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
      />
    </>
  );
};
export const CreateNewProductModal = ({ open, columns, onClose, onSubmit }) => {
  const validationSchema = yup.object({
    nume: yup.string().required("Numele este obligatoriu"),
    email: yup
      .string()
      .email("Te rog introdu un email valid")
      .required("Email-ul este obligatoriu"),
    parola: yup
      .string()
      .min(5, "Parola trebuie sa aiba minim 5 caractere")
      .required("Parola este obligatorie"),
    curier: yup.boolean().required(),
    admin: yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: {
      nume: "",
      email: "",
      parola: "",
      curier: false,
      admin: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  // const [values, setValues] = useState({
  //   nume: "",
  //   email: "",
  //   curier: false,
  //   admin: false,
  //   parola: "",
  // });

  // const handleSubmit = () => {
  //   //put your validation logic here
  //   onSubmit(values);
  //   onClose();
  // };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Creaza utilizator</DialogTitle>
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
              sx={{ width: "100%" }}
              key="nume"
              label="Nume"
              name="nume"
              value={formik.values.nume}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.nume && formik.errors.nume}
              error={formik.touched.nume && Boolean(formik.errors.nume)}
            />
            <TextField
              sx={{ width: "100%" }}
              key="email"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />

            <TextField
              fullWidth
              key="parola"
              label="Parola"
              name="parola"
              value={formik.values.parola}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.parola && formik.errors.parola}
              error={formik.touched.parola && Boolean(formik.errors.parola)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="parola"
              autoComplete="current-password"
            />
            <FormControl aria-label="position">
              <FormControlLabel
                id="curier"
                key="curier"
                value="curier"
                control={
                  <Switch
                    id="curier"
                    checked={formik.values.curier}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Curier"
                labelPlacement="start"
              />
            </FormControl>

            <FormControl aria-label="position">
              <FormControlLabel
                id="admin"
                key="admin"
                value="admin"
                control={
                  <Switch
                    id="admin"
                    checked={formik.values.admin}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Admin"
                labelPlacement="start"
              />
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" type="submit" variant="contained">
          Creaza Utilizator
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validatePret = (pret) => pret >= 1;

export default AdminTableUsers;
