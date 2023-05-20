import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { schimbaParolaPas2 } from "../api";

const ChangePasswordContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChangePasswordForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const SchimbareParola = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schimbaParolaPas2(token, newPassword);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
    // Implement your password change logic here
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <ChangePasswordContainer>
      <ChangePasswordForm>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </form>
      </ChangePasswordForm>
    </ChangePasswordContainer>
  );
};

export default SchimbareParola;
