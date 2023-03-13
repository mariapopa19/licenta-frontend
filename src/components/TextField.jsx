import {styled} from "@mui/material/styles";
import { TextField } from "@mui/material";;

export const RoundedTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: '25px',
        },
    },
});