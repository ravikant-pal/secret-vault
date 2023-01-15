import { FavoriteOutlined } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function Copyright(props) {
  return (
    <Stack sx={{ mt: 4 }} direction="column" alignItems="center">
      <Typography
        variant="caption"
        color="primary"
        align="center"
        display="block"
        {...props}
      >
        {"Copyright © "}
        <Link href="https://water.bottle">Secret Vault</Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="caption" color="primary">
          Made with
        </Typography>
        <FavoriteOutlined color="primary" fontSize="small" />
        <Typography variant="caption" color="primary">
          by{" "}
          <Link href="https://www.linkedin.com/in/pol-alok/">Ravikant Pal</Link>
        </Typography>
      </Stack>
    </Stack>
  );
}
