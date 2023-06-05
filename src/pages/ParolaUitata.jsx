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
import { schimbaParolaPas1 } from "../api";
import { useNavigate } from "react-router-dom";
import { RoundedTextField } from "../components/TextField";
import * as yup from "yup";
import { useFormik } from "formik";

const ForgotPasswordContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ForgotPasswordForm = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  // background-color: #f5f5f5;
  border-radius: 4px;
`;

const ParolaUitata = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Trebuie să fie un email valid")
      .required("Email-ul este obligatoriu"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await schimbaParolaPas1(values.email);
        navigate("/email-trimis");
      } catch (e) {
        console.log(e);
      }
    },
  });


  return (
    <ForgotPasswordContainer>
      <Card sx={{ minWidth: 275 }}>
        <ForgotPasswordForm>
          <Typography variant="h5" gutterBottom>
            Ai uitat parola?
          </Typography>
          <Typography variant="body2" gutterBottom>
            Introduceti mai jos adresa de email pentru a primi link-ul de
            resetare parola.
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
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email && formik.errors.email
                }
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                required
                autoFocus
              />
              <Button type="submit" variant="contained" color="primary">
                Resetare Parola
              </Button>
            </Box>
          </form>
        </ForgotPasswordForm>
      </Card>
    </ForgotPasswordContainer>
  );
};

export default ParolaUitata;
