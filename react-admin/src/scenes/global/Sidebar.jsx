import { useState } from "react";
import { ProSideBar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/style.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import HelpOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BarOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PieOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TimeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MapOutlinedIcon from "@mui/icons-material/LightModeOutlined";


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, SetSelected] = useState("Dashboard");
    return (
        <>
            <Box
                sx={{
                    "& .pro-sidebar-inner": {
                        background: `${colors.primary[400]} !important`
                    },
                    "& .pro-icon-wrapper": {
                        backgroundColor: "transparent !important"
                    },
                    "& .pro-inner-item": {
                        padding: "5px 35px 5px 20px !important"
                    },
                    "& .pro-inner-item:hover": {
                        color: "#868dfb !important"
                    },
                    "& .pro-menu-item.active": {
                        color: "#6870fa !important"
                    }
                }}>
            </Box>
            {/*USER*/}
            {!isCollapsed && (
                <>
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={`../../assets/user.png`}
                            style={{cursor:"pointer", borderRadius="50%"}}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography>Ed Roh</Typography>
                        <Typography>VP Fancy Admin</Typography>
                    </Box>
                </>

            )}

        </>
    );
}

export default Sidebar;
