import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../context/user";
import { useLoginUser } from "../queries/user";

const Login = () => {
  const navigate = useNavigate();
  const userDispatch = useContext(UserDispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useLoginUser();

  const handleLogin = (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    userLogin.mutate(user);
  };

  if (userLogin.isSuccess) {
    localStorage.setItem("token", userLogin.data.data.token);
    localStorage.setItem("user", JSON.stringify(userLogin.data.data.user));

    userDispatch(userLogin.data.data.user);

    navigate("/contact");
  }

  return (
    <div className="Login">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: window.innerHeight - 48 }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="header"
            height="140"
            image="/images/header.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </Typography>

            {/* Form */}
            <Box sx={{
              mt: 1
            }}>
              <form onSubmit={handleLogin}>
                <Box>
                  <TextField
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
                    type="password"
                    label="Password"
                    defaultValue=""
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Box>

                {userLogin.isError &&
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {userLogin.error.response.data.message}
                  </Alert>
                }

                <Box sx={{
                  mt: 1,
                }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    disabled={userLogin.isLoading}
                    onClick={handleLogin}
                  >
                    Login
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
              <Link to="/register">Register</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

export default Login;
