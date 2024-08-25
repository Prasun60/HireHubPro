import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EmojiTransportationRoundedIcon from "@mui/icons-material/EmojiTransportationRounded";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";
import {
  AppBar,
  Button,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Stack,
  Toolbar,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fade } from "react-reveal";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SupplierListCardSent({ data }) {
  const { rawMaterials, Services } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [PackageRawMaterials, setPackageRawMaterials] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDetalis, setOpenDialogDetails] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [dialogType, setDialogType] = useState(""); 
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    if (!rawMaterials || !account) return;

    const updatedPackageRawMaterials = data.rawMaterials.map(item => {
      const rawMaterial = rawMaterials.find(item1 => item1.materialId === item.materialId);
      if (rawMaterial) {
        return {
          ...rawMaterial,
          quantity: item.quantity, 
        };
      } else {
        return null; 
      }
    });

    setPackageRawMaterials(updatedPackageRawMaterials.filter(item => item !== null));
    
  };
  
  const handleOpenDialog = (type) => {
    setSelectedTransporter(null); 
    setDialogType(type); 
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialogDetails = () => {
    setOpenDialogDetails(true);
  };

  const handleCloseDialogDetails = () => {
    setOpenDialogDetails(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <Fade bottom>
    <Card sx={{ maxWidth: 370, borderRadius: "24px", borderColor: "white" }}>
        <CardHeader title={data.packageId} subheader={`Manufacturer: ${data.manufacturerId.slice(0,20)}...`} />
      {/* <CardHeader title={data.name} subheader={data.manufacturer_id} /> */}
      <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
         image={`${CONSTANTS.IPFSURL}/${data.ipfs_hash}`}
        alt="Manufacturer"
      />

        <CardActions>
          <Stack spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<InfoOutlinedIcon />}
                onClick={handleOpenDialogDetails}
                sx={{ borderRadius: "50px" }}
                color="success"
              >
                Package Details
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                endIcon={<EmojiTransportationRoundedIcon />}
                onClick={() => handleOpenDialog("transporter")}
                sx={{
                  borderRadius: "50px",
                  width: "345px",
                  marginBottom: "10px",
                }}
                color="success"
              >
                Transportation Details
              </Button>
            </Grid>
          </Stack>
        </CardActions>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        sx={{backdropFilter: "blur(10px)"}}  TransitionComponent={Transition} 
      >
        <DialogTitle>Transportation Details</DialogTitle>

        <DialogContent>
          <div>
              <>
                <Card sx={{ marginBottom: "16px" }}>
                  <CardHeader
                    title="Transporter"
                    // subheader="0xAB6bDA0a4e847Af362d54f88cC3663C219688c27"
                    subheader={data.transporterId}
                  />
                </Card>
              </>
      
          </div>

          <div>
          
              <Card sx={{ marginBottom: "16px" }}>
                <CardHeader
                  title= "Inspector"
                  // subheader= "0xE8Dc9F3cecc1E7DD7737001f1987cc2813246A93"
                  subheader={data.inspectorId}
                />
              </Card>
         
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={openDialogDetalis}
        onClose={handleCloseDialogDetails}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialogDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Package Details
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            <Typography variant="body2" color="text.secondary">
              <div className="dialog-container" style={{ marginTop: "8px" }}>
              {PackageRawMaterials.map((chemical, index) => (
                  <Card sx={{ maxWidth: 700, marginBottom: "16px" }}>
               
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${CONSTANTS.IPFSURL}/${chemical.ipfs_hash}`} // 
                        alt={chemical.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {chemical.name} ({chemical.quantity} Kg)
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {chemical.description}
                        </Typography>
                      </CardContent>
             
                  </Card>
                ))}
              </div>
            </Typography>
            <Divider />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
    </Fade>
  );
}
