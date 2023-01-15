import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignItems="center"
      justify="center"
    >
      <Box
        sx={{
          maxWidth: "40%",
          minHeight: "20vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="403.svg"
          style={{
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
          }}
        />
      </Box>

      <Typography variant="h5" m={1}>
        Unauthorized
      </Typography>
      <Typography variant="subtitle1">
        You do not have access to the requested page.
      </Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{
          borderRadius: 5,
        }}
        startIcon={<ArrowBackRounded />}
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Unauthorized;
