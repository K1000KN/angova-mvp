import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebar.scss";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseIcon from "@mui/icons-material/Close";

const SideNavigation = ({ toggled, handleToggleSidebar, setPage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sidebarMobileStyles = {
    backgroundColor: "white",
    maxHeight: "100vh",
    overflowY: "auto",
    width: "100%", // Définissez la largeur à 100%
    position: isMobile ? "fixed" : "relative",
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Vérifier l'état mobile au chargement de la page
    checkIsMobile();

    // Ajouter un écouteur pour détecter les changements d'état mobile
    window.addEventListener("resize", checkIsMobile);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <Sidebar
      className="custom-sidebar"
      onBackdropClick={handleToggleSidebar}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      style={sidebarMobileStyles} // Appliquez les styles personnalisés ici
      breakPoint="md"
    >
        <Menu  
          menuItemStyles={{
            button: {
              color: '#4691CD'
            },
          }}
        >
        
        {isMobile ? (
          <MenuItem suffix={<CloseIcon />} onClick={handleToggleSidebar}>
            <div
              style={{
                padding: '9px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px'
              }}
            >
              <img
              
                style={{ width: 100 }}
                alt="road"
                src="./images/logo.png"
              />
            </div>
          </MenuItem>
        ):( 
          <MenuItem onClick={handleToggleSidebar}>
            <div
              style={{
                padding: '9px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px'
              }}
            >
              <img            
                style={{ width: 120 }}
                alt="road"
                src="./images/logo.png"
              />
            </div>
          </MenuItem>
        )}
            
          <MenuItem onClick={()=>{setPage('home')}} 
            icon={<GridViewRoundedIcon />} > Dashboard </MenuItem>
          
          <SubMenu label="Wallet" icon={<AccountBalanceRoundedIcon />}>
            <MenuItem icon={<WalletRoundedIcon />}  onClick={()=>{setPage('payment')}} >
              Mon portefeuille
            </MenuItem>
            <MenuItem icon={<SavingsRoundedIcon />}>Nouvelles accès</MenuItem>
          </SubMenu>
          <MenuItem icon={<MonetizationOnRoundedIcon />}>Transactions</MenuItem>
          <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
            <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
            <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />}> Déconnexion </MenuItem>
        </Menu>
      </Sidebar>
      

  );
};
export default SideNavigation;