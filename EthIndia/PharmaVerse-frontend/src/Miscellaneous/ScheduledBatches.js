import React, { useState } from "react";
import batchData from "../scheduled.json";
import wholeSalerData from "../wholesaler.json";
import "../Miscellaneous/OngoingBatches.css";
import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import Timeline from "./Timeline";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ScheduledBatches = () => {
  const [batches, setBatches] = useState(batchData);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);
  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedBatch(null); // Reset selected batch when closing dialog
    setOpenDialog(false);
  };
  const handleSendPackage = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search Score..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button class="searchButton" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="allcards">
        {searchValue === ""
          ? batches.map((batch, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleOpenDialog(batch)}
              style={{ cursor: "pointer" }}
            >
              <div className="remove-when-use">
                <img src={batch.batchpic} alt="pic" />
              </div>
              <div className="details">
                <p>Score: {batch.score}</p>
                <div style={{ display: "flex" }}>
                  {batch.materialname.map((e, materialIndex) => (
                    <div key={materialIndex}>
                      {materialIndex + 1}:{e}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
          : batches
            .filter((item) => item.score === parseInt(searchValue))
            .map((batch, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleOpenDialog(batch)}
                style={{ cursor: "pointer" }}
              >
                <div className="remove-when-use">
                  <img src={batch.batchpic} alt="pic" />
                </div>
                <div className="details">
                  <p>Score: {batch.score}</p>
                  <div style={{ display: "flex" }}>
                    {batch.materialname.map((e, materialIndex) => (
                      <div key={materialIndex}>
                        {materialIndex + 1}:{e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ backdropFilter: "blur(20px)" }}
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
              Batch Details
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          {selectedBatch && (
            <Card sx={{ marginBottom: "16px", width: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedBatch.batchpic}
                  alt="material"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Score : {selectedBatch.score}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {selectedBatch.materialname.map((e, materialIndex) => (
                      <div key={materialIndex}>
                        {e} : {selectedBatch.materialquantity[materialIndex]} Kg
                      </div>
                    ))}
                  </Typography>
                  <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />
                  <div>
                    {selectedBatch &&
                      selectedBatch.transporter.map((transporter) => (
                        <Card
                          key={transporter.id}
                          sx={{ marginBottom: "16px" }}
                        >
                          <CardHeader
                            title={transporter.name}
                            subheader={transporter.address}
                          />
                        </Card>
                      ))}
                  </div>
                  <div>
                    {selectedBatch &&
                      selectedBatch.inspector.map((inspector) => (
                        <Card key={inspector.id} sx={{ marginBottom: "16px" }}>
                          <CardHeader
                            title={inspector.name}
                            subheader={inspector.address}
                          />
                        </Card>
                      ))}
                  </div>
                  <div>
                    {selectedBatch &&
                      selectedBatch.wholesaler.map((wholesaler) => (
                        <Card key={wholesaler.id} sx={{ marginBottom: "16px" }}>
                          <CardHeader
                            title={wholesaler.name}
                            subheader={wholesaler.address}
                          />
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
          <Divider />
          <div>
            <Timeline />
          </div>
          <Divider />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduledBatches;

