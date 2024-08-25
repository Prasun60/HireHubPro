import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import "./TransporterListCardSent.css";
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
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
  Toolbar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Fade } from "react-reveal";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function InspectorListCardSent({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [dialogType, setDialogType] = useState(""); // It can be "transporter" or "inspector"
  const { rawMaterials, Services } = useContext(ContractContext);
  let { account } = useContext(AuthContext);
  const [PackageRawMaterials, setPackageRawMaterials] = useState([]);

  console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)



  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    if (!rawMaterials || !account) return;

    console.log("real data: ",data);

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

  console.log("PackageRawMaterialsssssssssssssssssssssssssss", JSON.stringify(data))



  const handleOpenDialog = (type) => {
    setSelectedTransporter(null); // Reset selected transporter
    setDialogType(type); // Set the type of dialog (either "transporter" or "inspector")
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fade bottom>
    <Card sx={{ maxWidth: 370, borderRadius: "24px", borderColor: "white" }}>
      {/* <CardHeader title={data.name} subheader={data.manufacturerId} /> */}
      <CardHeader title={data.packageId} subheader={data.manufacturer_id} />
      <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
         image={`${CONSTANTS.IPFSURL}/${data.ipfs_hash}`}
        alt="Manufacturer"
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary" align="center">

    <Typography
      variant="subtitle1"
      color="text.primary"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Add this line for horizontal centering
        marginBottom: "8px",
      }}
    >
      Grade :
      <span
        style={{
          color: "#777",
          marginLeft: "8px",
          marginRight: "12px",
        }}
      >
        {data.grade} (out of 10)
      </span>
    </Typography>

</Typography>

      </CardContent>
      {data["send-package"] && (
        <CardActions>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<InfoOutlinedIcon />}
              onClick={() => handleOpenDialog("inspector")}
              sx={{
                borderRadius: "50px",
                width: "345px",
                marginBottom: "10px",
              }}
              color="success"
            >
              Package Details
            </Button>
          </Grid>
        </CardActions>
      )}

      {/* Dialog for Transporter Details */}
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

                // {data.chemicals.map((chemical, index) => (
                  <Card sx={{ maxWidth: 700, marginBottom: "16px" }}>
           
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${CONSTANTS.IPFSURL}/${chemical.ipfs_hash}`}
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
