import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
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
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "react-vertical-timeline-component/style.min.css";
import CloseIcon from "@mui/icons-material/Close";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import ApprovalIcon from "@mui/icons-material/Approval";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddchartIcon from "@mui/icons-material/Addchart";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackpackIcon from "@mui/icons-material/Backpack";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import clsx from "clsx";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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


const Timeline = ({ batch, role }) => {

  const { Services, batchreports } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [stageOneGrade, setStageOneGrade] = useState(null);
  const [stageTwoGrade, setStageTwoGrade] = useState(null);
  const [stageThreeGrade, setStageThreeGrade] = useState(null);
  const [stageOne, setStageOne] = useState(false);
  const [stageTwo, setStageTwo] = useState(false);
  const [stageThree, setStageThree] = useState(false);
  const [stageOneInspection, setStageOneInspection] = useState(false);
  const [stageTwoInspection, setStageTwoInspection] = useState(false);
  const [stageThreeInspection, setStageThreeInspection] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  const [isStageOneContentFilled, setIsStageOneContentFilled] = useState(false);
  const [isStageTwoContentFilled, setIsStageTwoContentFilled] = useState(false);
  const [isPackingContentFilled, setIsPackingContentFilled] = useState(false);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    if (!batch || !role) return;

    if (batch.stage === 1) {
      setStageOne(true);

    } else if (batch.stage === 2) {

      setStageOne(true);
      setStageTwo(true);

    } else if (batch.stage === 3) {
      setStageOne(true);
      setStageTwo(true);
      setStageThree(true);

    }

    if (batch.InspectionStage === 1) {
      setStageOneInspection(true);
      const stageOneReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 1);
      if (stageOneReport) {
        setStageOneGrade(stageOneReport.batchReportResult);
      }
    } else if (batch.InspectionStage === 2) {
      setStageOneInspection(true);
      setStageTwoInspection(true);
      const stageOneReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 1);
      const stageTwoReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 2);
      if (stageOneReport) {
        setStageOneGrade(stageOneReport.batchReportResult);
      }
      if (stageTwoReport) {
        setStageTwoGrade(stageTwoReport.batchReportResult);
      }
    } else if (batch.InspectionStage === 3) {
      setStageOneInspection(true);
      setStageTwoInspection(true);
      setStageThreeInspection(true);
      setStageOne(true);
      setStageTwo(true);
      setStageThree(true);
      const stageOneReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 1);
      const stageTwoReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 2);
      const stageThreeReport = batchreports.find((report) => report.batchId === batch.batchId && report.stage === 3);
      if (stageOneReport) {
        setStageOneGrade(stageOneReport.batchReportResult);
      }
      if (stageTwoReport) {
        setStageTwoGrade(stageTwoReport.batchReportResult);
      }
      if (stageThreeReport) {
        setStageThreeGrade(stageThreeReport.batchReportResult);
      }
    }
  };


  const Stage1DialogContent = () => {
    const [concentration, setConcentration] = useState("");
    const [pressure, setPressure] = useState("");
    const [density, setDensity] = useState("");
    const [volume, setVolume] = useState("");

    const isFormFilled = concentration && pressure && density && volume;

    return (
      <Typography variant="body2" color="text.secondary">
        <div style={{ marginTop: "8px", width: "100%" }}>
          <Card sx={{ marginBottom: "16px", width: "100%" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "8px",
                  marginBottom: "24px",
                  fontWeight: "700",
                }}
              >
                Actual Conditions for the Stage-1
              </Typography>
              <Stack
                direction="row"
                gap={4}
                sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
              >
                <FormControl defaultValue="" required>
                  <Label>Concentration:</Label>
                  <StyledInput
                    placeholder="Write the concentration here"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Pressure:</Label>
                  <StyledInput
                    placeholder="Write the pressure here"
                    value={pressure}
                    onChange={(e) => setPressure(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Density:</Label>
                  <StyledInput
                    placeholder="Write the density here"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Volume:</Label>
                  <StyledInput
                    placeholder="Write the volume here"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                  <HelperText />
                </FormControl>
              </Stack>
            </CardContent>
            <DialogActions>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  if (isFormFilled) {
                    StageOneInspectionCompleted();
                  }
                }}
                disabled={!isFormFilled}
              >
                Send
              </Button>
            </DialogActions>
          </Card>
        </div>
      </Typography>
    );
  };

  const Stage2DialogContent = () => {
    const [concentration, setConcentration] = useState("");
    const [pressure, setPressure] = useState("");
    const [density, setDensity] = useState("");
    const [volume, setVolume] = useState("");
    const isFormFilled = concentration && pressure && density && volume;
    return (
      <Typography variant="body2" color="text.secondary">
        <div style={{ marginTop: "8px", width: "100%" }}>
          <Card sx={{ marginBottom: "16px", width: "100%" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "8px",
                  marginBottom: "24px",
                  fontWeight: "700",
                }}
              >
                Actual Conditions for the Stage-2
              </Typography>
              <Stack
                direction="row"
                gap={4}
                sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
              >
                <FormControl defaultValue="" required>
                  <Label>Concentration:</Label>
                  <StyledInput
                    placeholder="Write the concentration here"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Pressure:</Label>
                  <StyledInput
                    placeholder="Write the pressure here"
                    value={pressure}
                    onChange={(e) => setPressure(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Density:</Label>
                  <StyledInput
                    placeholder="Write the density here"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl
                  defaultValue=""
                  required
                  style={{ marginBottom: "12px" }}
                >
                  <Label>Volume:</Label>
                  <StyledInput
                    placeholder="Write the volume here"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                  <HelperText />
                </FormControl>
              </Stack>
            </CardContent>
            <DialogActions>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  if (isFormFilled) {
                    StageTwoInspectionCompleted();
                  }
                }}
                disabled={!isFormFilled}
              >
                Send
              </Button>
            </DialogActions>
          </Card>
        </div>
      </Typography>
    );
  };

  const PackingLabelingDialogContent = () => {
    const [concentration, setConcentration] = useState("");
    const [pressure, setPressure] = useState("");
    const [density, setDensity] = useState("");
    const [volume, setVolume] = useState("");
    const isFormFilled = concentration && pressure && density && volume;

    return (
      <Typography variant="body2" color="text.secondary">
        <div style={{ marginTop: "8px", width: "100%" }}>
          <Card sx={{ marginBottom: "16px", width: "100%" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "8px",
                  marginBottom: "24px",
                  fontWeight: "700",
                }}
              >
                Actual Conditions for the Packing and Labeling
              </Typography>
              <Stack
                direction="row"
                gap={4}
                sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
              >
                <FormControl defaultValue="" required>
                  <Label>Concentration:</Label>
                  <StyledInput
                    placeholder="Write the concentration here"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Pressure:</Label>
                  <StyledInput
                    placeholder="Write the pressure here"
                    value={pressure}
                    onChange={(e) => setPressure(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Density:</Label>
                  <StyledInput
                    placeholder="Write the density here"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                  />
                  <HelperText />
                </FormControl>

                <FormControl defaultValue="" required>
                  <Label>Volume:</Label>
                  <StyledInput
                    placeholder="Write the volume here"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                  <HelperText />
                </FormControl>
              </Stack>
            </CardContent>
            <DialogActions>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  if (isFormFilled) {
                    StageThreeInspectionCompleted();
                  }
                }}
                disabled={!isFormFilled}
              >
                Send
              </Button>
            </DialogActions>
          </Card>
        </div>
      </Typography>
    );
  };

  const handleOpenDialog = (stage) => {
    setSelectedStage(stage);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStage(null);
  };

  const StageOneCompleted = async () => {
    const response = await Services.update_batch_state(batch.batchId, 1);

    if (response.success) {
      console.log("Stage 1 completed");
    setStageOne(true);
    }
    else{
      console.log("Error" + response.message);
    }

    setStageOne(true);
  };
  const StageTwoCompleted = async () => {
    const response = await Services.update_batch_state(batch.batchId, 2);

    if (response.success) {
      console.log("Stage 2 completed");
    setStageTwo(true);
    }
    else{
      console.log("Error" + response.message);
    }

    setStageTwo(true);
  };
  const StageThreeCompleted = async () => {
    const response = await Services.update_batch_state(batch.batchId, 3);

    if (response.success) {
      console.log("Stage 3 completed");
     setStageThree(true);
    }
    else{
      console.log("Error" + response.message);
    }

    setStageThree(true);
  };

  const StageOneInspectionCompleted = async () => {

    const response = await Services.update_batch_inspection_state(batch.batchId,1);

    if (response.success) {
          setStageOneInspection(true);
          setOpenDialog(false);
          setSelectedStage(null);
    }
    else{
      console.log("Error" + response.message);
      handleCloseDialog();
    }

    setStageOneInspection(true);
    setOpenDialog(false);
    setSelectedStage(null);

  };

  const StageTwoInspectionCompleted = async () => {
    const response = await Services.update_batch_inspection_state(batch.batchId,2);

    if (response.success) {
          setStageTwoInspection(true);
          setOpenDialog(false);
          setSelectedStage(null);
    }
    else{
      console.log("Error" + response.message);
      handleCloseDialog();
    }

    setStageTwoInspection(true);
    setOpenDialog(false);
    setSelectedStage(null);
  };
  const StageThreeInspectionCompleted = async () => {
    const response = await Services.update_batch_inspection_state(batch.batchId,3);

    if (response.success) {
          setStageThreeInspection(true);
          setOpenDialog(false);
          setSelectedStage(null);
    }
    else{
      console.log("Error" + response.message);
      handleCloseDialog();
    }

    setOpenDialog(false);
    setSelectedStage(null);
    setStageThreeInspection(true);
  };

  return (
    <>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid  rgb(16, 204, 82)" }}
          date="Date"
          // date={batch.manufacturingDate.toString()}
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<BatchPredictionIcon />}
        >
          <h3 className="vertical-timeline-element-title">Creation of Batch</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Manufacturer ID : 0x122341241213dbm */}
            Manufacturer ID : {batch && batch.manufacturerId}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Date"
          contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<ApprovalIcon />}
        >
          <h3 className="vertical-timeline-element-title">Stage-1</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Manufacturer ID : 0x122341241213dbm */}
            Manufacturer ID : {batch.manufacturerId}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: "50px" }}
              onClick={() => {
                StageOneCompleted();
              }}
              disabled={stageOne || role != "manufacturer"}
              endIcon={<LibraryAddCheckIcon />}
              color="primary"
              style={{ color: "white" }}
            >
              {!stageOne && role == "manufacturer" && <>Complete</>}
              {!stageOne && role != "manufacturer" && <>Yet to be completed</>}
              {stageOne && <>Completed...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Date"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<AddchartIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Stage-1 (INSPECTION)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Inspector ID : 0x122341241213dfgh */}
            Inspector ID : {batch.inspectorId}

          </h4>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Grade : x (out of 10) */}
            {stageOneGrade ? `${stageOneGrade} (out of 10)` : "Yet to be Inspected"}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white" }}
              sx={{ borderRadius: "50px" }}
              onClick={() => {
                handleOpenDialog("stage1");
              }}
              disabled={stageOneInspection || role != "inspector"}
              endIcon={<LibraryAddCheckIcon />}
            >
              {!stageOneInspection && role == "inspector" && <>Do Inspection</>}
              {!stageOneInspection && role != "inspector" && <>Yet to be Inspected</>}
              {stageOneInspection && <>Inspected...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Date"
          contentStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid rgb(16, 204, 82)" }}
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<AddBusinessIcon />}
        >
          <h3 className="vertical-timeline-element-title">Stage-2</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Manufacturer ID : 0x122341241213dbm */}
            Manufacturer ID : {batch.manufacturerId}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white" }}
              sx={{ borderRadius: "50px" }}
              onClick={StageTwoCompleted}
              disabled={stageTwo || role != "manufacturer"}
              endIcon={<LibraryAddCheckIcon />}
            >
              {!stageTwo && role == "manufacturer" && <>Complete</>}
              {!stageTwo && role != "manufacturer" && <>Yet to be completed</>}
              {stageTwo && <>Completed...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Date"
          contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<AdsClickIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Stage-2 (INSPECTION)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Inspector ID : 0x122341241213dfgh */}
            Inspector ID : {batch.inspectorId}

          </h4>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Grade : x (out of 10) */}
            {stageTwoGrade ? `${stageTwoGrade} (out of 10)` : "Yet to be Inspected"}

          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white" }}
              sx={{ borderRadius: "50px" }}
              onClick={() => {
                handleOpenDialog("stage2");
              }}
              disabled={stageTwoInspection || role != "inspector"}
              endIcon={<LibraryAddCheckIcon />}
            >
             {!stageTwoInspection && role == "inspector" && <>Do Inspection</>}
              {!stageTwoInspection && role != "inspector" && <>Yet to be Inspected</>}
              {stageOneInspection && <>Inspected...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Date"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid  rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<BackpackIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Packing and Labeling
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Manufacturer ID : 0x122341241213dbm */}
            Manufacturer ID : {batch.manufacturerId}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white" }}
              sx={{ borderRadius: "50px" }}
              onClick={StageThreeCompleted}
              disabled={stageThree || role != "manufacturer"}
              endIcon={<LibraryAddCheckIcon />}
            >
              {!stageThree && role == "manufacturer" && <>Complete</>}
              {!stageThree && role != "manufacturer" && <>Yet to be completed</>}
              {stageThree && <>Completed...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Date"
          contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<LocalPostOfficeIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Packing and Labeling (INSPECTION)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Inspector ID : 0x122341241213dfgh */}
            Inspector ID : {batch.inspectorId}

          </h4>
          <h4 className="vertical-timeline-element-subtitle">
            {/* Grade : x (out of 10) */}
            {stageThreeGrade ? `${stageThreeGrade} (out of 10)` : "Yet to be Inspected"}

          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Stack
            direction="row"
            sx={{ marginTop: "24px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white" }}
              sx={{ borderRadius: "50px" }}
              onClick={() => {
                handleOpenDialog("packing");
              }}
              disabled={stageThreeInspection || role != "inspector"}
              endIcon={<LibraryAddCheckIcon />}
            >
              {!stageThreeInspection && role == "inspector" && <>Do Inspection</>}
              {!stageThreeInspection && role != "inspector" && <>Yet to be Inspected</>}
              {stageThreeInspection && <>Inspected...</>}
            </Button>
          </Stack>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "10px solid  rgb(16, 204, 82)" }}
          icon={<AssignmentTurnedInIcon />}
        />
      </VerticalTimeline>

      <Dialog
        maxWidth="md"
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
              Inspection Details
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            {selectedStage === "stage1" && <Stage1DialogContent />}
            {selectedStage === "stage2" && <Stage2DialogContent />}
            {selectedStage === "packing" && <PackingLabelingDialogContent />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timeline;
