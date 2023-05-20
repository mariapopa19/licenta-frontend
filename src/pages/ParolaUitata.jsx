import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { schimbaParolaPas1 } from "../api";
import { useNavigate } from "react-router-dom";

const ForgotPasswordContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ForgotPasswordForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ParolaUitata = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await schimbaParolaPas1(email)
        navigate('/email-trimis')
    } catch (e) {
       console.log(e);
      }
    console.log("Email:", email);
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordForm>
        <Typography variant="h5" gutterBottom>
        Ai uitat parola?
        </Typography>
        <Typography variant="body2" gutterBottom>
        Introduceti mai jos adresa de email pentru a primi link-ul de resetare parola.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Resetare Parola
          </Button>
        </form>
      </ForgotPasswordForm>
    </ForgotPasswordContainer>
  );
};

export default ParolaUitata;
