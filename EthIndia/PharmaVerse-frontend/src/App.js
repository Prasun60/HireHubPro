import react,{ useContext, useEffect } from "react";
import "./App.css";
import Admin_Page from "./Component/Admin-Page";
import Supplier from "./Component/Supplier";
import Inventory from "./Component/Inventory";
import WholeSaler from "./Component/Wholesaler";
import { Route, Routes, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./Miscellaneous/NavBar";
import Manufacturer from "./Component/Manufacturer";
import Transporter from "./Component/Transporter";
import Inspector from "./Component/Inspector";
// import ContactUs from './Component/ContactUs';
import ContractContextProvider from './Context/ContractContext';
import NotFound from "./Component/NotFound";
import HomePage from "./Component/HomePage";
import { AuthContext } from "./Context/AuthContext";



const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});




function App() {
  const {role} = useContext(AuthContext)
  
  useEffect(()=>{
    if(role == ""&& window.location.pathname!="/"){
      window.location.href="/"
    }
    
    console.log("roleeeeeeee"+role)
  },[role])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          
          <Route exact path="/admin" element={<Admin_Page />} />
          <Route
            exact
            path="/inventory"
            element={
              <>
                <Inventory />
              </>
            }
          />
          <Route
            exact
            path="/supplier"
            element={
              <>
                <Supplier />
              </>
            }
          />
          <Route
            exact
            path="/transporter"
            element={
              <>
                <Transporter />
              </>
            }
          />
          <Route
            exact
            path="/inspector"
            element={
              <>
                <Inspector />
              </>
            }
          />
          <Route exact path="/manufacturer" element={<Manufacturer />} />
          <Route exact path="/wholesaler" element={<WholeSaler />} />

          {/* <Route path='/contactus' element={<><ContactUs /></>} /> */}
          <Route path='/' element={<HomePage role={role} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
