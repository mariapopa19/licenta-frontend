import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const RootBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: "bold",
  letterSpacing: "-0.05em",
  marginBottom: theme.spacing(2),
  color: red[500],
}));

const Subheading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const ErrorButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  padding: theme.spacing(1.5, 4),
}));

export default function ErrorPage() {
  const error = useRouteError();
  const theme = useTheme();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <RootBox>
        <Heading variant="h1" gutterBottom>
          Oops!
        </Heading>
        <Subheading variant="h4" gutterBottom>
          {error.status}
        </Subheading>
        <Subheading variant="h4" gutterBottom>
          {error.statusText}
          {error.data?.message && <p>{error.data.message}</p>}
        </Subheading>
        <ErrorButton
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ backgroundColor: theme.palette.primary.dark }}
        >
          Go back
        </ErrorButton>
      </RootBox>
      // <div id="error-page">
      //   <h1>Oops!</h1>
      //   <p>Sorry, an unexpected error has occurred.</p>
      //   <p>
      //     <i>{error.statusText || error.message}</i>
      //   </p>
      // </div>
    );
  } else {
    return (
      <RootBox>
        <Heading variant="h1" gutterBottom>
          Oops!
        </Heading>
        <Subheading variant="h4" gutterBottom>
          Page not found
        </Subheading>
        <ErrorButton
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ backgroundColor: theme.palette.primary.dark }}
        >
          Go back
        </ErrorButton>
      </RootBox>
    );
  }
}
