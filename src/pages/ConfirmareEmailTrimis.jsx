import React from "react";
import { Container, Typography, Box } from "@mui/material";
import styled from "styled-components";

const ConfirmationPageContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ConfirmationBox = styled(Box)`
  text-align: center;
`;

const ConfirmationPage = ({email}) => {
  return (
    <ConfirmationPageContainer>
      <ConfirmationBox>
        <Typography variant="h5" gutterBottom>
          Confirmare Email
        </Typography>
        <Typography variant="body2" gutterBottom>
          Un email de confirmare a fost trimis la adresa {email}.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Vă rugăm să verificați emailul și să urmați instrucțiunile pentru a
          finaliza procesul de confirmare.
        </Typography>
      </ConfirmationBox>
    </ConfirmationPageContainer>
  );
};

export default ConfirmationPage;
