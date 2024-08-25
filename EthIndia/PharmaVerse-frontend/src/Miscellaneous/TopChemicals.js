import React, { useState,useEffect } from "react";
import jsonData from "../data.json";
import "./ChemicalList.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CONSTANTS from "../Utils/Constants";

import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  return (
    <NumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  800: "#004c99",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 4px;
  margin: 0 4px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 0;
  border-radius: 999px;
  color: ${theme.palette.mode === "dark" ? blue[300] : blue[600]};
  background: transparent;

  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? blue[800] : blue[100]};
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
const TopChemicals = () => {
  const data = jsonData[0];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [incrementValue, setIncrementValue] = useState(0);
  const {services, rawMaterials} = useContext(ContractContext);
  const [rawmat,setRawmat] = useState([]);
  const [cardimage,setCardimage] = useState([]);

    const [xAxisData, setxaxisdata] = useState([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      console.log(rawMaterials);
      setRawmat(rawMaterials)
      const processedChartData = rawMaterials.map(rawMaterial => ({
        x: rawMaterial.name,
        y: rawMaterial.quantity, // Use the appropriate property for y-axis data
        description: rawMaterial.description,
      }));
      console.log("proccessed data is "+JSON.stringify(processedChartData))
      setxaxisdata(processedChartData);
    };
    fetchRawMaterials();
  }, [services, rawMaterials]);


  // const xAxisData = data.xaxis.map((x, index) => ({
  //   x,
  //   quantity: data.quantity[index],
  // }));

    // need to check
  const [d, setD] = useState(rawmat);
  // const [d, setD] = useState(jsonData);
  const [searchValue, setSearchValue] = useState("");
  const [enableUpdate, setEnableUpdate] = useState(false);
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available.</div>;
  }
  // Sorting the array by quantity in descending order
  xAxisData.sort((a, b) => b.y - a.y);

  const increaseQuantity = (index, increment) => {
    const newData = [...d];
    newData[index].quantity += increment;
    setD(newData);
  };

  // const increaseQuantity = (index, increment) => {
  //   console.log("increaseQuantity called with index:", index, "increment:", increment);
  //   const newData = [...d];
  //   newData[0].quantity[index] += increment;
  //   setD(newData);
  // };
  const handleCardClick = (chemical) => {
    setSelectedChemical(chemical);
    {rawMaterials.map((it)=>it.name==chemical.x?setCardimage(`${CONSTANTS.IPFSURL}/${it.ipfs_hash}`):"")}
    setDialogOpen(true);
  };
  // Taking the top 3 values
  const topXAxisData = xAxisData.slice(0, 3);
  console.log("topaxis is :"+ JSON.stringify(topXAxisData))
  
  return (
    <>
      <div style={{ marginTop: "20px", display: "flex", gap: "2rem", display:"flex",justifyContent:"center" }}>
        {topXAxisData.map((item) => (
          <div key={item.x}  onClick={() => handleCardClick(item)} style={{margin:"50px"}}>
            <div
              className="card"
              style={{ cursor: "pointer", height: "300px", width:"300px" }}
            >
              {console.log(`Image is : ${CONSTANTS.IPFSURL}/${rawMaterials[0].ipfs_hash}`)}
              {rawMaterials.map((it)=>it.name==item.x?<img src={`${CONSTANTS.IPFSURL}/${it.ipfs_hash}`} style={{height:"200px",width:"200px"}}/>:"")}
              <div className="card__content">
                <p className="card__title">
                  {item.x}:{item.quantity}
                </p>
                <p className="card__description">
                  {/* {item.description} */}
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <Dialog
          fullScreen
          TransitionComponent={Transition}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          sx={{ backdropFilter: "blur(20px)" }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close">
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Chemical Details
              </Typography>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <div>
              <Typography variant="body2" color="text.secondary">
                <div style={{ marginTop: "8px", width: "100%" }}>
                  <Card sx={{ marginBottom: "16px", width: "100%" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={cardimage}
                      alt="material"
                    />
                    <CardContent>
                      {console.log("selected chemical is :"+JSON.stringify(selectedChemical))}
                      {selectedChemical && (
                        <>
                          <DialogTitle>
                            {selectedChemical.x} ({Number(selectedChemical.y)})
                          </DialogTitle>
                          <DialogContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginTop: "8px", marginBottom: "24px" }}
                            >
                              {selectedChemical.description}
                            </Typography>
                            <CustomNumberInput
                              value={incrementValue}
                              onChange={(e) =>
                                setIncrementValue(parseInt(e.target.value))
                              }
                              aria-label="Quantity Input"
                              min={1}
                              max={99}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => setDialogOpen(false)}
                              color="primary"
                            >
                              Close
                            </Button>
                            <Button
                              onClick={() => {
                                console.log(
                                  "Update button clicked. Increment:",
                                  incrementValue
                                );
                                increaseQuantity(
                                  xAxisData.findIndex(
                                    (item) => item.x === selectedChemical.x
                                  ),
                                  incrementValue
                                );
                                setIncrementValue(0);
                                setDialogOpen(false);
                                setEnableUpdate(true);
                              }}
                              color="primary"
                            >
                              Update
                            </Button>
                          </DialogActions>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </Typography>
              <Divider />
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TopChemicals;
