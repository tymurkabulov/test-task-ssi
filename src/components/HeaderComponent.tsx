import React from 'react';
import {AppBar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth");

    const handleLogout = () => {
        localStorage.removeItem('isAuth');
        navigate("/login");
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    {isAuth ? (
                        <Button
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Link
                            component="button"
                            color="inherit"
                            variant="body2"
                            underline="none"
                            gap="5px"
                            display="flex"
                            alignItems="center"
                            onClick={() => navigate('/login')}
                        >
                            <span>Login</span>
                            <LoginIcon />
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;