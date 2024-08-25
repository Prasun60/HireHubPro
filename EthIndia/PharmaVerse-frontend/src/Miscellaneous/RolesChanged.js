import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Stack,
  InputLabel,
} from "@mui/material";

import {  useContext} from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";


const RolesChanged = () => {
  const [role, setRole] = useState("");
  const [accountId, setAccountId] = useState("");
  const [deassignId, setDeassignId] = useState("");


  const { Services } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const handleChange = async (event) => {
    setRole(event.target.value);

    // Assuming you have a mapping from role names to key values (1, 2, 3, ...)
    const roleMappings = {
      Inspector: 3,
      Manufacturer: 2,
      Supplier: 1,
      Transporter: 4,
      Wholesaler: 5,
    };

    const roleKey = roleMappings[event.target.value];

    try {
      if (roleKey && accountId) {
        await Services.assign_role(accountId, roleKey);
        // Role assigned successfully, you can show a success message or update the UI as needed.
        console.log(`Role ${event.target.value} assigned to account ${accountId}`);
      }
    } catch (error) {
      console.error("Error assigning role: ", error);
      // Handle error, show error message, etc.
    }
  };

  const handleDeassignRole = async () => {
    try {
      if (deassignId) {
        // Assuming you have a way to determine the role of the account you want to deassign.
        // For example, you could have a function that queries the blockchain to get the role of an account.
        // Let's assume you have a function called getAccountRole that returns the role key.


          const res = await Services.deAssign_role(deassignId);
          // Role deassigned successfully, you can show a success message or update the UI as needed.

          if(res.status){
            console.log(`Role deassigned from account ${deassignId}`);
          }

          
      
      }
    } catch (error) {
      console.error("Error deassigning role: ", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: "8px",
          marginBottom: "24px",
          fontWeight: "700",
          textAlign: "left",
        }}
      >
        Assign Role
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: "700px" }}>
        <TextField
          fullWidth
          required
          label="Account ID"
          value={accountId}
          onChange={(e) => {
            setAccountId(e.target.value);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          color="success"
        />
        <FormControl fullWidth>
          <InputLabel
            id="demo-select-small-label"
            InputLabelProps={{
              shrink: true,
            }}
            color="success"
          >
            Role
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={role}
            label="Role"
            onChange={handleChange}
            fullWidth
            color="success"
          >
            <MenuItem value="Inspector">Inspector</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Transporter">Transporter</MenuItem>
            <MenuItem value="Wholesaler">Wholesaler</MenuItem>
          </Select>
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          sx={{ maxWidth: "100px" }}
          disabled={!(accountId && role)}
        >
          Send
        </Button>
      </Stack>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: "80px",
          marginBottom: "24px",
          fontWeight: "700",
          textAlign: "left",
        }}
      >
        Deassign Role
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: "700px" }}>
        <TextField
          required
          label="Account ID"
          value={deassignId}
          onChange={(e) => {
            setDeassignId(e.target.value);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          color="success"
        />
        <Button
          color="primary"
          variant="contained"
          sx={{ maxWidth: "100px" }}
          disabled={!deassignId}
          onClick={handleDeassignRole}
        >
          Send
        </Button>
      </Stack>
    </div>
  );
};

export default RolesChanged;
