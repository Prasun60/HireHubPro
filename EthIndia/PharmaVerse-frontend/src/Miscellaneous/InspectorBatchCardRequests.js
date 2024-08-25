import React, { useState } from "react";
import batchData from "../batch.json";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";
import {
  AppBar,
  Button,
  CardActionArea,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Fade } from "react-reveal";
import Timeline from "./Timeline";
import clsx from "clsx";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const StyledInput = styled(Input)(
  ({ theme }) => `
  
  .${inputClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]
    };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function InspectorBatchCardRequests({ data }) {

  const { packages, Services, medicines } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [BatchMedicines, setBatchMedicines] = useState([]);


  const [batches, setBatches] = useState(batchData);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setSelectedTransporter(null);
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSendPackage = () => {
    handleCloseDialog();
  };

  return (
    <Fade bottom>
      <>
        {data && data.map((batch, index) => (
          <div key={index}>
            {
              data.length > 0 ? (<Card
                sx={{ maxWidth: 363, borderRadius: "24px", borderColor: "white" }}
              >
                <CardHeader title={batch.batchId} subheader={data.manufacturerId && `Manufacturer: ${data.manufacturerId.slice(0, 20)}...`} />
                <CardMedia
                  component="img"
                  height="194"
                  // image={batch.batchpic}
                  image={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`}
                  alt="Batch"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {/* Current Stage : {batch.currentstage} */}
                    Current Stage : {batch.stage}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack spacing={0.2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<AirplayRoundedIcon />}
                        onClick={() => handleOpenDialog(batch)}
                        sx={{
                          borderRadius: "50px",
                          width: "345px",
                          marginBottom: "10px",
                        }}
                        color="success"
                      >
                        Do Inspection
                      </Button>
                    </Grid>
                  </Stack>
                </CardActions>
                <Dialog
                  TransitionComponent={Transition}
                  fullScreen
                  open={openDialog}
                  onClose={handleCloseDialog}
                >
                  <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseDialog}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                      >
                        Inspection Details
                      </Typography>
                    </Toolbar>
                  </AppBar>

                  <DialogContent>
                    {selectedBatch && (
                      <Card sx={{ marginBottom: "16px", width: "100%" }}>

                        <CardMedia
                          component="img"
                          height="140"
                          // image={selectedBatch.batchpic}
                          image={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`}
                          alt="material"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {/* Stage : {selectedBatch.currentstage} */}
                            Stage : {batch.stage}
                          </Typography>

                          <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

                          <div>

                            <Card
                              sx={{ marginBottom: "16px" }}
                            >
                              <CardHeader
                                title="Inspector"
                                // subheader="0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"
                                subheader={batch.inspectorId}
                              />
                            </Card>
                          </div>
                          <div>
                            <Card
                              sx={{ marginBottom: "16px" }}
                            >
                              <CardHeader
                                title="Wholesaler"
                                // subheader="0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"
                                subheader={batch.wholesalerId}
                              />
                            </Card>

                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <Divider />
                    <div>
                      <Timeline batch={batch} role={"inspector"} />
                    </div>
                    <Divider />
                  </DialogContent>
                </Dialog>
              </Card>) : (
                <Container maxWidth="md" className="not-found-container">
                  <div className="logo-container"></div>
                  <div style={{ borderRadius: "24px" }}>
                    <Typography
                      variant="h2"
                      className="not-found-title"
                      color="white"
                      sx={{ fontWeight: 700 }}
                    ></Typography>
                    <Typography
                      variant="h4"
                      className="not-found-subtitle"
                      color="white"
                      sx={{ marginBottom: "8px", fontWeight: 700 }}
                    >
                      Oops! No Batch Requests Found
                    </Typography>
                    <Typography
                      variant="body1"
                      className="not-found-message"
                      color="white"
                      sx={{
                        marginBottom: "24px",
                        fontWeight: 700,
                        paddingBottom: "12px",
                      }}
                    >
                      The requested batch you are looking for might have been removed or is
                      temporarily unavailable.
                    </Typography>
                  </div>
                </Container>

              )
            }
          </div>
        ))}
      </>
    </Fade>
  );
}
