import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../../context/user";

const O3AppBar = () => {
    const user = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user");

        userDispatch(null);

        navigate("/login");
    }

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    📝
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    O3 Contacts {user && `😀 Welcome ${user.firstName}`}
                </Typography>
                {user &&
                    <Button size="small" variant="contained" disableElevation onClick={handleLogout}>
                        Logout
                    </Button>
                }
            </Toolbar>
        </AppBar>
    );
}

export default O3AppBar;