import { ArrowBackIosRounded } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

const AppBar = ({ pageTitle, showBackButton }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "black",
      }}
    >
      {showBackButton && (
        <Tooltip title="Back">
          <IconButton
            sx={{ backgroundColor: "#626161", color: "#2ECC40" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosRounded />
          </IconButton>
        </Tooltip>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/secret-vault-low.png" height={100} alt="Secret Wault Logo" />
        <Typography component="h1" variant="h5" sx={{ m: 1, color: "white" }}>
          {pageTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppBar;
