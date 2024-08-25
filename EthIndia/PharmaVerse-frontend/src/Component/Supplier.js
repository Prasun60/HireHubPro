import React from "react";
import manufacturerData from "../manufacturerData.json";
import "./Supplier.css";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Inventory from "../Component/Inventory";
import { Grid, Tab, Tabs } from "@mui/material";
import ChemicalListChart from "../Miscellaneous/ChemicalLineChart";
import ChemicalList from "../Miscellaneous/ChemicalList";
import TopChemicals from "../Miscellaneous/TopChemicals";
import SupplierListCardRequests from "../Miscellaneous/SupplierListCardRequests";
import SupplierListCardSent from "../Miscellaneous/SupplierListCardSent";
import Logo from '../Images/logoPharma.png';
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import { useAccount } from "wagmi";

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
  const { packages, Services, rawMaterials } = useContext(ContractContext);
  const { authenticate, deauthenticate, account, role } = React.useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [ReceivedRequestData, setReceivedRequestData] = React.useState([]);
  const [SentRequestData, setSentRequestData] = React.useState([]);

  useAccount({
    onConnect: async (accounts) => {
      console.log(accounts.address);

      const res = await Services.get_role(accounts.address);
      if(res.success){
        authenticate(accounts.address,res.data);
      }
      else{
        authenticate(accounts.address, '');
      }
    },
    onDisconnect: () => {
      deauthenticate();
    },
  });

  useEffect(() => {
    setData();
  }, [packages,account]);

  const setData = async () => {
    if (!packages || !account) return;

    console.log("account: ",account);

    console.log("packages: ",packages);

    const receivedRequests = packages
      .filter((item) => item.supplierId === account && item.stage === 3)
      .map((item) => {
        const materialId = item.rawMaterials[0]?.materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.materialId === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

      console.log("receivedRequests: ", receivedRequests);

    setReceivedRequestData(receivedRequests);

    const sentRequests = packages
      .filter((item) => item.supplierId === account && item.stage === 0)
      .map((item) => {
        const materialId = item.rawMaterials[0].materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.materialId === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists


        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

      console.log("sentRequests: ", sentRequests);

    setSentRequestData(sentRequests);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <img src={Logo} alt="Logo" width={"200rem"} height={"50rem"}
          style={{ marginTop: "1rem", marginBottom: "1rem" }} />
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
            label="My Requests"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Send Requests"
            {...a11yProps(1)}
          />
        </Tabs>
      </List>
      <Divider />
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
            <div className="card-container">
              {/* {manufacturerData
                .filter((data) => !data["send-package"])
                .map((data, index) => (
                  <SupplierListCardRequests key={index} data={data} />
                ))} */}
              {ReceivedRequestData.map((data, index) => (
                  <SupplierListCardRequests key={index} data={data} />
                ))}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="card-container">
              {/* {manufacturerData
                .filter((data) => data["send-package"])
                .map((data, index) => (
                  <SupplierListCardSent key={index} data={data} />
                ))} */}
              {SentRequestData.map((data, index) => (
                  <SupplierListCardSent key={index} data={data} />
                ))}
            </div>
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
