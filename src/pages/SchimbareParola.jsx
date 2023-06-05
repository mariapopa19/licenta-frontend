import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { schimbaParolaPas2 } from "../api";
import { RoundedTextField } from "../components/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

const ChangePasswordContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChangePasswordForm = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  // background-color: #f5f5f5;
  border-radius: 4px;
`;

const SchimbareParola = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    parolaNoua: yup
      .string()
      .min(5, "Parola trebuie să fie formată din minim 5 caractere")
      .required("Parola este obligatorie"),
    confirmaParola: yup
      .string()
      .min(5, "Parola trebuie să fie formată din minim 5 caractere")
      .required("Parola este obligatorie")
      .oneOf([yup.ref("parolaNoua"), null], "Trebuie să fie aceeși parolă"),
  });

  const formik = useFormik({
    initialValues: {
      parolaNoua: "",
      confirmaParola: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.parolaNoua === values.confirmaParola) {
        try {
          await schimbaParolaPas2(token, values.parolaNoua);
          navigate("/login");
        } catch (e) {
          console.log(e);
        }
      }
    },
  });

  return (
    <ChangePasswordContainer>
      <Card>
        <ChangePasswordForm>
          <Typography variant="h5" gutterBottom>
            Resetează-ți parola
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <RoundedTextField
                sx={{ width: 400 }}
                type="password"
                name="parolaNoua"
                label="Parola Nouă"
                variant="outlined"
                value={formik.values.parolaNoua}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.parolaNoua && formik.errors.parolaNoua
                }
                error={
                  formik.touched.parolaNoua && Boolean(formik.errors.parolaNoua)
                }
                required
                autoFocus
              />
              <RoundedTextField
                sx={{ width: 400 }}
                type="password"
                name="confirmaParola"
                label="Confirmă parola"
                variant="outlined"
                value={formik.values.confirmaPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.confirmaParola && formik.errors.confirmaParola
                }
                error={
                  formik.touched.confirmaParola &&
                  Boolean(formik.errors.confirmaParola)
                }
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Resetează-ți parola
              </Button>
            </Box>
          </form>
        </ChangePasswordForm>
      </Card>
    </ChangePasswordContainer>
  );
};

export default SchimbareParola;
