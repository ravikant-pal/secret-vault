import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import Copyright from "./Copyright";
import AppBar from "./AppBar";

const AppContainer = ({ title, showBackButton, ...propes }) => {
  return (
    <Paper
      sx={{
        backgroundColor: "black",
        padding: 2,
        minHeight: "100vh",
      }}
    >
      <AppBar pageTitle={title} showBackButton={showBackButton} />
      <Box
        sx={{
          mb: 2,
          padding: 2,
          borderRadius: 5,
          minHeight: showBackButton ? "65vh" : "75vh",
          backgroundColor: "#626161",
          position: "relative",
        }}
      >
        {propes.children}
      </Box>
      <Copyright />
    </Paper>
  );
};

export default AppContainer;
