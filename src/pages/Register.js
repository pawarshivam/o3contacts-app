import React, { useState } from "react";
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useRegisterUser } from "../queries/user";
import { shouldShowErrorFor, getHelperText } from "../utils/error";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const userRegister = useRegisterUser();

  const handleRegister = (event) => {
    event.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    userRegister.mutate(user);
  };

  return (
    <div className="Register">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: window.innerHeight - 48 }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Register
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </Typography>

            {/* Form */}
            <Box sx={{
              mt: 1
            }}>
              <form onSubmit={handleRegister}>
                <Box>
                  <TextField
                    error={shouldShowErrorFor(userRegister, 'firstName')}
                    helperText={getHelperText(userRegister, 'firstName')}
                    type="text"
                    label="First Name"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Box>

                <Box>
                  <TextField
                    error={shouldShowErrorFor(userRegister, 'lastName')}
                    helperText={getHelperText(userRegister, 'lastName')}
                    type="lastName"
                    label="Last Name"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Box>

                <Box>
                  <TextField
                    error={shouldShowErrorFor(userRegister, 'email')}
                    helperText={getHelperText(userRegister, 'email')}
                    type="email"
                    label="Email"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Box>

                <Box>
                  <TextField
                    error={shouldShowErrorFor(userRegister, 'password')}
                    helperText={getHelperText(userRegister, 'password')}
                    type="password"
                    label="Password"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Box>

                <Box>
                  <TextField
                    error={shouldShowErrorFor(userRegister, 'phone')}
                    helperText={getHelperText(userRegister, 'phone')}
                    type="text"
                    label="Phone"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setPhone(event.target.value)}
                    inputProps={{ maxLength: 10 }}
                  />
                </Box>

                {userRegister.isError &&
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {userRegister.error.response.data.message}
                  </Alert>
                }

                {userRegister.isSuccess &&
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Please check your inbox for verification link
                  </Alert>
                }

                <Box sx={{
                  mt: 1,
                }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    disabled={userRegister.isLoading}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to="/">Home</Link>
            </Button>
            <Button size="small">
              <Link to="/login">Login</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

export default Register;
