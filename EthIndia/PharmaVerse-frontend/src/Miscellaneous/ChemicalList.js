import React, { useState,useEffect } from "react";
import jsonData from "../data.json";
import "./ChemicalList.css";
import chemimg from "../Images/raul.jpg";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Icon,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import CONSTANTS from "../Utils/Constants";


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

const ChemicalList = () => {
  const data = jsonData[0];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [incrementValue, setIncrementValue] = useState(0);
  const {Services, rawMaterials} = useContext(ContractContext);
  const [rawmat,setRawmat] = useState([]);



  const [xAxisData, setxaxisdata] = useState([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      console.log("Chemical list raw materials: ", rawMaterials);
      setRawmat(rawMaterials)
      const processedChartData = rawMaterials.map(rawMaterial => ({
        x: rawMaterial.name,
        y: rawMaterial.quantity, // Use the appropriate property for y-axis data
      }));
      setxaxisdata(processedChartData);
    };
    fetchRawMaterials();
  }, [Services, rawMaterials]);

  // Creating an array of objects with x-axis and quantity
  // const xAxisData = rawMaterials.map((item, index) => ({
  //   x:item.name,
  //   quantity: item.quantity,
  // }));



  // const xAxisData = data.xaxis.map((x, index) => ({
  //   x,
  //   quantity: data.quantity[index],
  // }));

  // need to check
  const [d, setD] = useState(rawmat);
  // const [d, setD] = useState(jsonData);
  const [searchValue, setSearchValue] = useState("");
  const [enableUpdate, setEnableUpdate] = useState(false);


  // const increaseQuantity = async (index, increment) => {
  //   // const newData = [...d];
  //   // newData[index].quantity += increment;
  //   // setD(newData);
  //   // console.log("index is " +index, increment);

  //   //index+1

  // };

  const increaseQuantity = async (index, increment) => {
    try {
      console.log("materialId in filr: ");
      const materialId = rawMaterials[index].materialId; // Assuming you have an ID property in your rawMaterials data
      console.log("materialId in filr: ",materialId);
      
      await Services.increase_quantity(materialId, increment);
      // Services.increase_quantity(materialId, increment);
      // console.log(response);
      
    } catch (error) {
      console.error("Error increasing quantity: ", error);
      // Handle the error as needed
    }
  };
  

  // const increaseQuantity = (index, increment) => {
  //   const newData = [...d];
  //   newData[0].quantity[index] += increment;
  //   setD(newData);
  // };



  const [cardimg,setCardimg] = useState([]);

  const handleCardClick = (chemical,index) => {
    setSelectedChemical(chemical);
    // setCardimg(chemical);
    setCardimg(`${CONSTANTS.IPFSURL}/${rawMaterials[index].ipfs_hash}`)
    setDialogOpen(true);
  };

  console.log("xaxis data is:");
xAxisData.forEach((item) => {
  console.log(item.x, item.y); // Assuming x and y are properties of your objects
});

console.log("raw materials from chemical list: ", rawMaterials)
console.log(CONSTANTS.IPFSURL+"/"+rawMaterials[0].ipfs_hash)







  return (
    <div className="chemical-list">
    <div class="searchBox">
      <input
        class="searchInput"
        type="text"
        name=""
        placeholder="Search something"
        value={searchValue} // Bind the value to the searchValue state
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
    <div className="allcards" style={{ cursor: "pointer" }}>
      
      {xAxisData
        .filter((qd) =>
          qd.x.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((qd,index) => (
          <div
            className="card"
            key={qd.x}
            style={{
              backgroundImage: `url(${CONSTANTS.IPFSURL}/${rawMaterials[index].ipfs_hash})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            onClick={() => handleCardClick(qd,index)}
          >
            <p className="card__title" style={{ color: "white", fontSize: "2rem", marginTop: "12rem" }}>{qd.x}</p>
            {/* <img src={`${CONSTANTS.IPFSURL}/${rawMaterials[index].ipfs_hash}`} alt="" height="200px" width="160px" /> */}
            <div className="card__content">
              <p className="card__title">
                {qd.x}:{qd.quantity}
              </p>
              <p className="card__description">
                {rawMaterials[index].description}
              </p>
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
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
              >
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
                      image={cardimg}
                      alt="material"
                    />
                    <CardContent>
                      {selectedChemical && (
                        <>
                          <DialogTitle>
                            {console.log("selected chemical is: ", selectedChemical)}
                            {selectedChemical.x} ({(selectedChemical.y)})
                          </DialogTitle>
                          <DialogContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginTop: "8px", marginBottom: "24px" }}
                            >
                              {rawMaterials.map((rawMaterial) => rawMaterial.name==selectedChemical.x?rawMaterial.description:"")}
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
    </div>
  );
};

export default ChemicalList;
