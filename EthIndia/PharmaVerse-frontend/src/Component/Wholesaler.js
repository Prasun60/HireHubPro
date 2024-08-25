import React from "react";
import transporterPage from "../transporterPage.json";
import manufacturerData from "../manufacturerData.json";
import "./Supplier.css";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AuthContext } from "../Context/AuthContext";
import { ContractContext } from "../Context/ContractContext";
import { useAccount } from "wagmi";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Tab, Tabs } from "@mui/material";
import InspectorListCardRequests from "../Miscellaneous/InspectorListCardRequests";
import InspectorListCardSent from "../Miscellaneous/InspectorListCardSent";
import Logo from "../Images/logoPharma.png";
import InspectorBatchCardRequests from "../Miscellaneous/InspectorBatchCardRequests";
import InspectorBatchCardSent from "../Miscellaneous/InspectorBatchCardSent";
import ChemicalListChart from "../Miscellaneous/ChemicalLineChart";
import MedicineList from "../Miscellaneous/MedicineList";
import CompletedBatches from "../Miscellaneous/CompletedBatches";
import SupplierListCardSent from "../Miscellaneous/SupplierListCardSent";
import ChemicalList from "../Miscellaneous/ChemicalList";
const drawerWidth = 240;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function ResponsiveDrawer(props) {
  const { authenticate, deauthenticate, account, role } =
    React.useContext(AuthContext);
  const { Services } = React.useContext(ContractContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  useAccount({
    onConnect: async (accounts) => {
      console.log(accounts.address);

      const res = await Services.get_role(accounts.address);
      if (res.success) {
        authenticate(accounts.address, res.data);
      } else {
        authenticate(accounts.address, "");
      }
    },
    onDisconnect: () => {
      deauthenticate();
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <img
          src={Logo}
          alt="Logo"
          width={"200rem"}
          height={"50rem"}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      </div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: "green",
            },
          }}
        >
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Completed Batches"
            {...a11yProps(0)}
          />
        </Tabs>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ConnectButton />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <TabPanel value={value} index={0}>
            <CompletedBatches isWholesaler={true} />
          </TabPanel>
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
