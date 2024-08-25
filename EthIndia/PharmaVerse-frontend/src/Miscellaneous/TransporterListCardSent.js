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
import CONSTANTS from "../Utils/Constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TransporterListCardSent({ data }) {

  const { rawMaterials, Services } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [PackageRawMaterials, setPackageRawMaterials] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [dialogType, setDialogType] = useState("");

  useEffect(() => {
    setData();
  }, [rawMaterials]);

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
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">

            <Typography
              variant="subtitle1"
              color="text.primary"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <div>
                Inspector ID
              </div>
              <div
                style={{
                  fontSize: "12px",
                  marginBottom: "-8px",
                }}
              >
                {/* 0x511F0e5A8495d7c7709f905186A01751D8b3f7C8 */}
                {data.inspectorId}
              </div>
            </Typography>

          </Typography>

        </CardContent>
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
