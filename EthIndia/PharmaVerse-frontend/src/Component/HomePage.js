import React, { useState } from "react";
import "./HomePage.css";
import logo from "../Images/logoPharma.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Drawer, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AboutImg2 from "../Images/aboutimg2.jpg";
import AboutImg1 from "../Images/aboutimg.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { Fade } from "react-reveal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ContractContext } from "../Context/ContractContext";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 906px)");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeService, setActiveService] = useState("web");
  const { Services } = useContext(ContractContext);
  const navigate = useNavigate();
  const { authenticate, deauthenticate, account, role } = useContext(AuthContext);

  useAccount({
    onConnect: async (accounts) => {
      console.log(accounts.address);

      const res = await Services.get_role(accounts.address);
      if (res.success) {
        console.log("res.data issssss:" + res.data)
        authenticate(accounts.address, res.data);
      }
      else {
        authenticate(accounts.address, '');
      }
    },
    onDisconnect: () => {

      console.log("disconnected")
      deauthenticate();
    },
  });



  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeDrawer = () => {
    setIsMobileMenuOpen(false);
  };
  const servicesData = [
    {
      id: "web",
      title: "Web Development",
      description:
        "Our web development team creates modern and responsive websites...",
    },
    {
      id: "app",
      title: "App Development",
      description:
        "We specialize in developing innovative mobile applications...",
    },
    {
      id: "design",
      title: "Design Services",
      description:
        "Our design experts create visually stunning and user-friendly designs...",
    },
  ];
  const worksData = [
    {
      id: 1,
      title: "Project 1",
      description: "Description of Project 1",
      imageUrl: "/path-to-image1.jpg",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description of Project 2",
      imageUrl: "/path-to-image2.jpg",
    },
    // Add more work items as needed
  ];

  return (

    <div style={{ margin: "0" }}>

      <section class="hero">
        <div class="main-width">
          <header className="homepage-header">
            <div class="logo">
              <img src={logo} alt="" width={"200rem"} height={"50rem"} />
            </div>
            <nav>
              {isMobile && (
                <div style={{ cursor: "pointer" }} onClick={toggleMobileMenu}>
                  <MenuIcon color="success" />
                </div>
              )}
              {!isMobile && (
                <ul
                  style={{ marginLeft: "100px" }}
                  className={`nav-list ${isMobileMenuOpen ? "hide" : ""}`}
                >
                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      Home
                    </a>
                  </li>

                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      About
                    </a>
                  </li>

                  <li class="btn">
                    <a href="#" style={{ textDecoration: "none" }}>
                      Contact Us
                    </a>
                  </li>
                  <li class="btn1">
                    <ConnectButton />
                  </li>
                </ul>
              )}
            </nav>
          </header>

          <div className="container">
            <div className="hero-text">
              <h3>Hi, There !</h3>
              <div className="h1">
                This is <span>PharmaVerse</span>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                odit unde placeat, enim tenetur aspernatur necessitatibus rem
                earum facilis perferendis! Perferendis voluptates reiciendis
                doloribus rem a, ipsa tempore dolorum magnam.
              </p>
              <div className="social">
                <a href="#">
                  <FacebookIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <LinkedInIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <InstagramIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <TwitterIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
              </div>
              <Stack
                sx={{ justifyContent: "center", alignItems: "center" }}
                direction={"row"}
              >
                {role == "" ? <>{navigate("/")}</> : <button
                  className="btn0"
                  type="button"
                  style={{ width: "12rem" }}
                  onClick={() => {
                    switch (role) {
                      case "Supplier":
                        navigate("/supplier")
                        break;
                      case "Transporter":
                        navigate("/transporter");
                        break;
                      case "Inspector":
                        navigate("/inspector");
                        break;
                      case "Admin":
                        navigate("/admin");
                        break;
                      case "Manufacturer":
                        navigate("/manufacturer");
                        break;
                      default:
                        navigate("/");
                        break;
                    }
                  }}
                >
                  Go To Dashboard
                </button>}
              </Stack>
            </div>
          </div>
        </div>
      </section>



      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={isMobile ? toggleMobileMenu : closeDrawer}
      >
        <div class="logo" style={{ marginLeft: "18px", marginTop: "10px" }}>
          <img src={logo} alt="" width={"200rem"} height={"50rem"} />
        </div>
        <Divider sx={{ width: "100%" }} />
        <div
          style={{
            width: "250px",
            padding: "20px",
          }}
        >
          <List>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="Home" sx={{textAlign:"center" }}/> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </a>
              </li>
            </ListItem>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="About" sx={{ textAlign: "center" }} /> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  About
                </a>
              </li>
            </ListItem>

            <ListItem
              sx={{
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <li class="btn">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "white",

                  }}
                >
                  Contact Us
                </a>
              </li>
            </ListItem>

            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              <div class="btn1">
                <ConnectButton />
              </div>
            </ListItem>
          </List>
        </div>
        <Divider sx={{ width: "100%" }} />
      </Drawer>
      <div className="bottom" style={{ padding: "0" }}>
        <p>© 2023 Upsilon - All Rights Reserved</p>{" "}
      </div>
    </div>

  );
};
export default HomePage;
