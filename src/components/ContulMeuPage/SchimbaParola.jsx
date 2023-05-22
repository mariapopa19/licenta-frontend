import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { RoundedTextField } from "../TextField";
import { RoundedButton } from "../RoundedButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schimbaParolaPas2 } from "../../api";

const SchimbaParola = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const handleSavlveazaParolaNoua = async () => {
    try {
      await schimbaParolaPas2(token, newPassword);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
    }
  }
  return (
    <Grid container>
      <Grid
        item
        container
        direction="column"
        spacing={3}
        sx={{ alignContent: "center" }}
      >
        <Grid item sx={{ width: { lg: 500, md: 450, sm: 400, xs: 350 } }}>
          <Typography variant="h6">Parola Nouă</Typography>
          <RoundedTextField
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              // <-- This is where the toggle button is added.
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
          />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            width: { lg: 500, md: 450, sm: 400, xs: 350 },
            justifyContent: "right",
          }}
        >
          <RoundedButton variant="contained" size="large" onClick={handleSavlveazaParolaNoua}>
            Salvează
          </RoundedButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SchimbaParola;
