import { createTheme } from "@mui/material";

export const themeOption = createTheme({
  palette: {
    type: "dark",
    action: {
      disabledBackground: "#626161",
      disabled: "#2ECC40",
    },
    primary: {
      main: "#2ECC40",
    },

    secondary: {
      main: "#000",
    },

    default: {
      main: "#fff",
    },
  },
});
