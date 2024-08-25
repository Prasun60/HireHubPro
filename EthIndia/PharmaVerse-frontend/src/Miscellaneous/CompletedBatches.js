import React, { useState } from "react";
import CompletebatchData from "../completedBatch.json";
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
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Timeline from "./Timeline";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CompletedBatches = ({ isAdmin = false, isWholesaler = false }) => {

  const { batches, Services, medicines, batchreports } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [CompletedBatches, setCompletedBatches] = useState(CompletebatchData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [searchValue, setSearchValue] = useState("");
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    if (!batches || !account) return;

    let updatedBatches;

    if (isAdmin) {
      updatedBatches = batches
        .filter((item) => item.stage === 5 && item.InspectionStage === 4)
        .map((item) => {
          const updatedMedicines = item.medicines.map((medicine) => {
            const matchedMedicine = medicines.find((m) => m.medicineId === medicine.medicineId);
            if (matchedMedicine) {
              return {
                ...matchedMedicine,
                quantity: medicine.quantity,
              };
            } else {
              return medicine;
            }
          });

          // Find the first medicine with a matching ipfs_hash
          const firstMedicineWithIpfs = updatedMedicines.find((medicine) => medicine.ipfs_hash);
          const Report = batchreports.find((report) => report.batchId === item.batchId && report.stage === 3);

          return {
            ...item,
            medicines: updatedMedicines,
            ipfs_hash: firstMedicineWithIpfs ? firstMedicineWithIpfs.ipfs_hash : '',
            grade: Report ? Report.batchReportResult : 0,
          };
        });
    }
    else if (isWholesaler) {
      updatedBatches = batches
        .filter((item) => item.wholesalerId === account && item.stage === 5 && item.InspectionStage === 4)
        .map((item) => {
          const updatedMedicines = item.medicines.map((medicine) => {
            const matchedMedicine = medicines.find((m) => m.medicineId === medicine.medicineId);
            if (matchedMedicine) {
              return {
                ...matchedMedicine,
                quantity: medicine.quantity,
              };
            } else {
              return medicine;
            }
          });

          // Find the first medicine with a matching ipfs_hash
          const firstMedicineWithIpfs = updatedMedicines.find((medicine) => medicine.ipfs_hash);
          const Report = batchreports.find((report) => report.batchId === item.batchId && report.stage === 3);

          return {
            ...item,
            medicines: updatedMedicines,
            ipfs_hash: firstMedicineWithIpfs ? firstMedicineWithIpfs.ipfs_hash : '',
            grade: Report ? Report.batchReportResult : 0,
          };
        });
    }
    else {
      updatedBatches = batches
        .filter((item) => item.manufacturerId === account && item.stage === 5 && item.InspectionStage === 4)
        .map((item) => {
          const updatedMedicines = item.medicines.map((medicine) => {
            const matchedMedicine = medicines.find((m) => m.medicineId === medicine.medicineId);
            if (matchedMedicine) {
              return {
                ...matchedMedicine,
                quantity: medicine.quantity,
              };
            } else {
              return medicine;
            }
          });

          // Find the first medicine with a matching ipfs_hash
          const firstMedicineWithIpfs = updatedMedicines.find((medicine) => medicine.ipfs_hash);
          const Report = batchreports.find((report) => report.batchId === item.batchId && report.stage === 3);

          return {
            ...item,
            medicines: updatedMedicines,
            ipfs_hash: firstMedicineWithIpfs ? firstMedicineWithIpfs.ipfs_hash : '',
            grade: Report ? Report.batchReportResult : 0,
          };
        });
    }
    setCompletedBatches(updatedBatches);
  };


  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setSelectedTransporter(null);
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setSelectedBatch(null);
    setOpenDialog(false);
  };

  const handleSendPackage = () => {
    setOpenDialog(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <div>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search Grade..."
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
          ? CompletedBatches.map((batch, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleOpenDialog(batch)}
              style={{ cursor: "pointer" }}
            >
              <div className="remove-when-use">
                <img src={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`} alt="pic" />
              </div>
              <div className="details">
                <p>Grade: {batch.grade}</p>
              </div>
            </div>
          ))
          : CompletedBatches
            .filter((item) => item.grade === parseInt(searchValue))
            .map((batch, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleOpenDialog(batch)}
                style={{ cursor: "pointer" }}
              >
                <div className="remove-when-use">
                  <img src={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`} alt="pic" />
                </div>
                <div className="details">
                <p>Grade: {batch.grade}</p>
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
            <>
              <div>
                <Card sx={{ marginBottom: "16px", width: "100%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    // image={selectedBatch.batchpic}
                    image={`${CONSTANTS.IPFSURL}/${selectedBatch.ipfs_hash}`}
                    alt="material"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Grade: {selectedBatch.grade}
                    </Typography>

                    {selectedBatch.medicines.map((item, materialIndex) => (
                      <div key={item.medicineId}>
                        {item.name} : {item.quantity} Kg
                      </div>
                    ))}

                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />
                    <div>
                      <Card
                        sx={{ marginBottom: "16px" }}
                      >
                        <CardHeader
                          title="Transporter"
                          subheader={selectedBatch.transporterId}
                        />
                      </Card>
                    </div>
                    <div>
                      <Card
                        sx={{ marginBottom: "16px" }}
                      >
                        <CardHeader
                          title="Inspector"
                          // subheader="0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"
                          subheader={selectedBatch.inspectorId}
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
                          subheader={selectedBatch.wholesalerId}
                        />
                      </Card>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <Divider />
              <div>
                <Timeline batch={selectedBatch} role={"manufacturer"} />
              </div>
              <Divider />
            </>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompletedBatches;
