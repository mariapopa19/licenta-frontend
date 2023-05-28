import * as React from "react"
import { Formik, Form, Field } from "formik"
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  FormControlLabel,
  Typography,
  ToggleButton
} from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify"
import MuiTextField from "@mui/material/TextField"
import {
  Autocomplete,
  TextField,
  Select,
  Switch,
  ToggleButtonGroup
} from "formik-mui"
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TimePicker, DatePicker, DateTimePicker } from "@mui/x-date-pickers"

export const ranges = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: '0-20',
      label: '0 to 20',
    },
    {
      value: '21-50',
      label: '21 to 50',
    },
    {
      value: '51-100',
      label: '51 to 100',
    },
  ];
  
  export const top100Films = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
    {title: "Schindler's List", year: 1993},
    {title: 'Pulp Fiction', year: 1994},
    {title: 'The Lord of the Rings: The Return of the King', year: 2003},
    {title: 'The Good, the Bad and the Ugly', year: 1966},
    {title: 'Fight Club', year: 1999},
    {title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001},
    {title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980},
    {title: 'Forrest Gump', year: 1994},
    {title: 'Inception', year: 2010},
    {title: 'The Lord of the Rings: The Two Towers', year: 2002},
    {title: "One Flew Over the Cuckoo's Nest", year: 1975},
    {title: 'Goodfellas', year: 1990},
    {title: 'The Matrix', year: 1999},
    {title: 'Seven Samurai', year: 1954},
    {title: 'Star Wars: Episode IV - A New Hope', year: 1977},
    {title: 'City of God', year: 2002},
    {title: 'Se7en', year: 1995},
    {title: 'The Silence of the Lambs', year: 1991},
    {title: "It's a Wonderful Life", year: 1946},
    {title: 'Life Is Beautiful', year: 1997},
    {title: 'The Usual Suspects', year: 1995},
    {title: 'Léon: The Professional', year: 1994},
    {title: 'Spirited Away', year: 2001},
    {title: 'Saving Private Ryan', year: 1998},
    {title: 'Once Upon a Time in the West', year: 1968},
    {title: 'American History X', year: 1998},
    {title: 'Interstellar', year: 2014},
    {title: 'Casablanca', year: 1942},
    {title: 'City Lights', year: 1931},
    {title: 'Psycho', year: 1960},
    {title: 'The Green Mile', year: 1999},
    {title: 'The Intouchables', year: 2011},
    {title: 'Modern Times', year: 1936},
    {title: 'Raiders of the Lost Ark', year: 1981},
    {title: 'Rear Window', year: 1954},
    {title: 'The Pianist', year: 2002},
    {title: 'The Departed', year: 2006},
    {title: 'Terminator 2: Judgment Day', year: 1991},
    {title: 'Back to the Future', year: 1985},
    {title: 'Whiplash', year: 2014},
    {title: 'Gladiator', year: 2000},
    {title: 'Memento', year: 2000},
    {title: 'The Prestige', year: 2006},
    {title: 'The Lion King', year: 1994},
    {title: 'Apocalypse Now', year: 1979},
    {title: 'Alien', year: 1979},
    {title: 'Sunset Boulevard', year: 1950},
    {
      title:
        'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    {title: 'The Great Dictator', year: 1940},
    {title: 'Cinema Paradiso', year: 1988},
    {title: 'The Lives of Others', year: 2006},
    {title: 'Grave of the Fireflies', year: 1988},
    {title: 'Paths of Glory', year: 1957},
    {title: 'Django Unchained', year: 2012},
    {title: 'The Shining', year: 1980},
    {title: 'WALL·E', year: 2008},
    {title: 'American Beauty', year: 1999},
    {title: 'The Dark Knight Rises', year: 2012},
    {title: 'Princess Mononoke', year: 1997},
    {title: 'Aliens', year: 1986},
    {title: 'Oldboy', year: 2003},
    {title: 'Once Upon a Time in America', year: 1984},
    {title: 'Witness for the Prosecution', year: 1957},
    {title: 'Das Boot', year: 1981},
    {title: 'Citizen Kane', year: 1941},
    {title: 'North by Northwest', year: 1959},
    {title: 'Vertigo', year: 1958},
    {title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983},
    {title: 'Reservoir Dogs', year: 1992},
    {title: 'Braveheart', year: 1995},
    {title: 'M', year: 1931},
    {title: 'Requiem for a Dream', year: 2000},
    {title: 'Amélie', year: 2001},
    {title: 'A Clockwork Orange', year: 1971},
    {title: 'Like Stars on Earth', year: 2007},
    {title: 'Taxi Driver', year: 1976},
    {title: 'Lawrence of Arabia', year: 1962},
    {title: 'Double Indemnity', year: 1944},
    {title: 'Eternal Sunshine of the Spotless Mind', year: 2004},
    {title: 'Amadeus', year: 1984},
    {title: 'To Kill a Mockingbird', year: 1962},
    {title: 'Toy Story 3', year: 2010},
    {title: 'Logan', year: 2017},
    {title: 'Full Metal Jacket', year: 1987},
    {title: 'Dangal', year: 2016},
    {title: 'The Sting', year: 1973},
    {title: '2001: A Space Odyssey', year: 1968},
    {title: "Singin' in the Rain", year: 1952},
    {title: 'Toy Story', year: 1995},
    {title: 'Bicycle Thieves', year: 1948},
    {title: 'The Kid', year: 1921},
    {title: 'Inglourious Basterds', year: 2009},
    {title: 'Snatch', year: 2000},
    {title: '3 Idiots', year: 2009},
    {title: 'Monty Python and the Holy Grail', year: 1975},
  ];
  

const Test = () => (
  <Formik
    initialValues={{
      email: "",
      password: "",
      select: "0-20",
      tags: [],
      rememberMe: true,
      date: new Date(),
      time: new Date(),
      dateTime: new Date(),
      toggle: [],
      autocomplete: []
    }}
    validate={values => {
      const errors = {}
      if (!values.email) {
        errors.email = "Required"
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address"
      }
      return errors
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false)
        alert(JSON.stringify(values, null, 2))
      }, 500)
    }}
  >
    {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
              helperText="Please Enter Email"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
          </Box>
          <Box margin={1}>
            <FormControlLabel
              control={
                <Field component={Switch} type="checkbox" name="rememberMe" />
              }
              label="Remember Me"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="select"
              label="With Select"
              select
              variant="standard"
              helperText="Please select Range"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            >
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </Box>
          <Box margin={1}>
            <FormControl sx={{ minWidth: 120 }}>
              <Field
                component={Select}
                type="text"
                label="Tags"
                name="tags"
                multiple={true}
                inputProps={{ name: "tags", id: "tags" }}
              >
                <MenuItem value="dogs">Dogs</MenuItem>
                <MenuItem value="cats">Cats</MenuItem>
                <MenuItem value="rats">Rats</MenuItem>
                <MenuItem value="snakes">Snakes</MenuItem>
              </Field>
            </FormControl>
          </Box>
          {isSubmitting && <LinearProgress />}
          <Box margin={1}>
            <Field component={TimePicker} name="time" label="Time" />
          </Box>
          <Box margin={1}>
            <Field component={DatePicker} name="date" label="Date" />
          </Box>
          <Box margin={1}>
            <Field
              component={DateTimePicker}
              name="dateTime"
              label="Date Time"
            />
          </Box>
          <Box margin={1}>
            <Typography>Toggle button</Typography>
            <Field component={ToggleButtonGroup} name="toggle" type="checkbox">
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              name="autocomplete"
              multiple
              component={Autocomplete}
              options={top100Films}
              getOptionLabel={option => option.title}
              style={{ width: 300 }}
              renderInput={params => (
                <MuiTextField
                  {...params}
                  name="autocomplete"
                  error={touched["autocomplete"] && !!errors["autocomplete"]}
                  helperText={touched["autocomplete"] && errors["autocomplete"]}
                  label="Autocomplete"
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box margin={1}>
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              onClick={() => {
                resetForm()
              }}
            >
              Reset
            </Button>
          </Box>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      </LocalizationProvider>
    )}
  </Formik>
)

export default Test;
