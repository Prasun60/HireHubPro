import React from "react";
import transporterPage from "../transporterPage.json";
import "./Supplier.css"; // Import your custom CSS file for styling
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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

  const { packages, Services, rawMaterials, batches, medicines, batchreports } = useContext(ContractContext);
  const { authenticate, deauthenticate, account, role } = React.useContext(AuthContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [ReceivedPackageRequestData, setReceivedPackageRequestData] = React.useState([]);
  const [SentPackageRequestData, setSentPackageRequestData] = React.useState([]);
  const [ReceivedBatchRequestData, setReceivedBatchRequestData] = React.useState([]);
  const [SentBatchRequestData, setSentBatchRequestData] = React.useState([]);
  
  useAccount({
    onConnect: async (accounts) => {
      console.log(accounts.address);

      const res = await Services.get_role(accounts.address);
      if (res.success) {
        authenticate(accounts.address, res.data);
      }
      else {
        authenticate(accounts.address, '');
      }
    },
    onDisconnect: () => {
      deauthenticate();
    },
  });
  useEffect(() => {
    setData();
  }, [packages,batches,account]);

  const setData = async () => {
    if (!packages || !account || !batches) return;

    const receivedRequestsPackage = packages
      .filter((item) => item.inspectorId === account && item.stage === 2)
      .map((item) => {
        const materialId = item.rawMaterials[0]?.materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.materialId === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

    setReceivedPackageRequestData(receivedRequestsPackage);

    const sentRequestsPackage = packages
      .filter((item) => item.inspectorId === account && item.stage === 3)
      .map((item) => {
        const materialId = item.rawMaterials[0].materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.id === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

      console.log("aaaaaaaaaaaa"+sentRequestsPackage)

    setSentPackageRequestData(sentRequestsPackage);


    // *********************
    console.log("batches: ",batches);
    const sentRequestsBatch = batches
      .filter((item) => item.inspectorId === account && item.InspectionStage === 4 ) // 
      .map((item) => {
        const medicineId = item.medicines[0].medicineId; // Get the medicineId from the first object
        const medicine = medicines.find((rm) => rm.medicineId === medicineId); // Find the medicine with matching id
        const ipfsHash = medicine ? medicine.ipfs_hash : ""; // Get the ipfs_hash if medicine exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the batch data
      });

    // setting the grade of batch as well
    const updatedSentBatchRequestData = sentRequestsBatch.map((batchData) => {
      const matchingReport = batchreports.find((report) =>
        report.batchId === batchData.batchId && report.stage === 3
      );
      const grade = matchingReport ? matchingReport.batchReportResult : 0;
      return { ...batchData, grade: grade };
    });

    setSentBatchRequestData(updatedSentBatchRequestData);
    console.log("updatedSentBatchRequestData: ",updatedSentBatchRequestData);

    const receivedRequestsBatch = batches
      .filter((item) => item.inspectorId === account && item.InspectionStage !== 4 )  // 
      .map((item) => {
        const medicineId = item.medicines[0].medicineId; // Get the materialId from the first object

        const medicine = medicines.find((rm) => rm.medicineId === medicineId); // Find the medicine with matching id

        const ipfsHash = medicine ? medicine.ipfs_hash : ""; // Get the ipfs_hash if medicine exists


        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the batch data
      });
    setReceivedBatchRequestData(receivedRequestsBatch);
    console.log("receivedRequestsBatch: ",receivedRequestsBatch);
  }

  console.log("SentPackageRequestData"+SentPackageRequestData)

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
            label="Package Requests"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Inspected Packages"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Batch Requests"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Inspected Batches"
            {...a11yProps(3)}
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
              {ReceivedPackageRequestData.map((data, index) => (
                  <InspectorListCardRequests key={index} data={data} />
                ))}
              {/* {transporterPage
                .filter((data) => !data["send-package"])
                .map((data, index) => (
                  <InspectorListCardRequests key={index} data={data} />
                ))} */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="card-container">
              {SentPackageRequestData.map((data, index) => (
                  <InspectorListCardSent key={index} data={data} />
                ))}
              {/* {transporterPage
                .filter((data) => data["send-package"])
                .map((data, index) => (
                  <InspectorListCardSent key={index} data={data} />
                ))} */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="card-container">
              <InspectorBatchCardRequests data={ReceivedBatchRequestData} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="card-container">
              <InspectorBatchCardSent data={SentBatchRequestData} />
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
