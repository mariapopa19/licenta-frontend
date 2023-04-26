import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { comandaAdmin, comenziAdmin, modificaComandaAdmin } from "../api";

const AdminTableComenzi = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [produse, setProduse] = useState([]);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      if (!Object.keys(validationErrors).length) {
        data[row.index] = values;
        const res = await modificaComandaAdmin(
          values.id,
          values.status,
          values.adresa,
          values.ziLivrare,
          values.intervalLivrare
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

  const handleModalOpen = async (row) => {
    try {
      const comanda = await comandaAdmin(row.original.id);
      setProduse(comanda.produse);
      setCreateModalOpen(true);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

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
        header: "Status",
        accessorKey: "status",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Adresa",
        accessorKey: "adresa",
        id: "adresa",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Oras",
        accessorKey: "oras",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
      {
        header: "Judet",
        accessorKey: "judet",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
      {
        header: "Zi livrare",
        accessorKey: "ziLivrare",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        header: "Interval livrare",
        accessorKey: "intervalLivrare",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'time'
        }),
      },
      {
        header: "Id-ul utilizatorului",
        accessorKey: "utilizatorId",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          disabled: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const fetchComenzi = async () => {
    try {
      const res = await comenziAdmin();
      // console.log(res);
      setData(res);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
  };

  useEffect(() => {
    fetchComenzi();
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
            <Tooltip arrow placement="right" title="Produsele comenzii">
              <IconButton onClick={() => handleModalOpen(row)}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
        produse={produse}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
};
export const CreateNewModal = ({ open, produse, onClose }) => {
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Produsele comenzii</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            my: "0.5rem",
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
          }}
        >
          {produse.map((produs) => {
            return (
              <Card sx={{ backgroundColor: "#EFEFEF" }}>
                <CardContent>
                  <Typography>{`Id:   ${produs.id}`}</Typography>
                  <Typography>{`Denumire:   ${produs.denumire}`}</Typography>
                  <Typography>{`Pret:   ${produs.pret}`}</Typography>
                  <Typography>{`Decriere:   ${produs.descriere}`}</Typography>
                  <Typography>{`ImageURL:   ${produs.imageURL}`}</Typography>
                  <Typography>
                    {`Cantitate:   ${produs.produseComanda.cantitate}`}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validatePret = (pret) => pret >= 1;

export default AdminTableComenzi;
