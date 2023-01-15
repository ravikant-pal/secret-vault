import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Avatar,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineRounded,
  AddCircleRounded,
  CheckRounded,
  DeleteRounded,
  VisibilityOffRounded,
  VisibilityRounded,
  VpnKeyRounded,
} from "@mui/icons-material";
import NewAppContainer from "../layout/AppContainer";

import useAuth from "../../hooks/useAuth";
import { getUserId } from "../../utils/authUtils";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useKey from "../../hooks/useKey";
import moment from "moment";
import { LoadingButton } from "@mui/lab";

const Keys = () => {
  const { auth } = useAuth();
  const { setSelectedKeyId } = useKey();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showSecretKeys, setShowSecretKeys] = useState(false);
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyLoading, setKeyLoading] = useState(false);
  const [secretActionId, setSecretActionId] = useState("");
  const [deleteActionId, setDeleteActionId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const saveKey = () => {
    setLoading(true);
    axiosPrivate
      .post(`/keys/new`, {
        userId: getUserId(),
        name: key,
      })
      .then((res) => {
        setLoading(false);
        setOpen(false);
        setKey("");
        setKeys([res.data, ...keys]);
      })
      .catch((err) => console.error(err));
  };
  const handleKeyChange = (e) => {
    setKey(e.target.value);
    setErrMsg("");
  };
  const handleDeleteKey = (id) => {
    setDeleteActionId(id);
    axiosPrivate
      .delete(`/keys/${auth.userId}/${id}`)

      .then((res) => {
        setDeleteActionId("");
        setKeys(keys?.filter((k) => k._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleAddKeyAsSecret = (id) => {
    setSecretActionId(id);
    axiosPrivate
      .patch(`/keys/make-secret/${id}`)
      .then((res) => {
        setSecretActionId("");
        setKeys(
          keys?.map((k) => {
            if (k._id === id) {
              return { ...k, is_secret: true };
            }
            return k;
          })
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setKeyLoading(true);
    const getKeys = async () => {
      try {
        const response = await axiosPrivate.get(`/keys/all/${getUserId()}`);
        setKeyLoading(false);
        setKeys(response.data.keys);
      } catch (err) {
        console.error(err);
        navigate("/auth", { state: { from: location }, replace: true });
      }
    };
    getKeys();
  }, []);
  return (
    <NewAppContainer title="Keys">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        {show && (
          <Tooltip title="Show or hide secret keys" placement="left" arrow>
            <IconButton
              edge="end"
              size="small"
              sx={{
                p: 0,
                mr: 2,
              }}
              aria-label="show-hidden"
              onClick={() => setShowSecretKeys(!showSecretKeys)}
            >
              {showSecretKeys ? (
                <VisibilityRounded />
              ) : (
                <VisibilityOffRounded />
              )}
            </IconButton>
          </Tooltip>
        )}
        <Box mr={1}>
          {!keyLoading ? (
            <Chip
              label={keys?.length}
              size="small"
              color="primary"
              variant="outlined"
            />
          ) : (
            <CircularProgress color="inherit" size="1.0rem" />
          )}
        </Box>

        <Button
          size="small"
          variant="contained"
          startIcon={<AddCircleRounded />}
          color="primary"
          sx={{ borderRadius: 10 }}
          onClick={() => setOpen(true)}
        >
          New
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          sx={{ "& .MuiDialog-paper": { backgroundColor: "#626161" } }}
        >
          <DialogTitle color="secondary">Add new key</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              fullWidth
              autoComplete="false"
              error={errMsg ? true : false}
              sx={{ mt: 2, mb: 2 }}
              size="small"
              helperText={errMsg}
              label="Key name"
              placeholder="Enter key name"
              variant="outlined"
              value={key}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  saveKey();
                }
              }}
              onChange={handleKeyChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 10 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              loadingPosition="start"
              onClick={saveKey}
              sx={{ borderRadius: 10 }}
              startIcon={<CheckRounded />}
              loading={loading}
            >
              save
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Box>
      {keys.length ? (
        <Stack direction="row">
          <List
            sx={{ mt: 1, width: "100%", overflowY: "scroll", height: "480px" }}
          >
            {keys?.map(({ _id, name, updatedAt, is_secret }) => (
              <React.Fragment key={_id}>
                {(!is_secret || (is_secret && showSecretKeys)) && (
                  <ListItem
                    sx={{
                      backgroundColor: "#2ECC402B",
                      borderRadius: 3,
                      mb: 1,
                      p: 0,
                    }}
                    onClick={() => {
                      setSelectedKeyId(_id);
                      navigate("/values");
                    }}
                  >
                    <ListItemButton sx={{ borderRadius: 3 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "black" }}>
                          <VpnKeyRounded sx={{ color: "#2ECC40" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={name}
                        secondary={
                          <Typography variant="caption">
                            {moment(updatedAt).format("lll")}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemSecondaryAction>
                      {!is_secret && (
                        <Tooltip title="Make secret key" placement="left" arrow>
                          <IconButton
                            edge="end"
                            aria-label="add-to-secret"
                            onClick={() => handleAddKeyAsSecret(_id)}
                          >
                            {secretActionId === _id ? (
                              <CircularProgress color="primary" size="1rem" />
                            ) : (
                              <AddCircleOutlineRounded color="primary" />
                            )}
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete" placement="top" arrow>
                        <IconButton
                          edge="end"
                          color="secondary"
                          aria-label="delete-key"
                          onClick={() => handleDeleteKey(_id)}
                          sx={{
                            ml: 2,
                          }}
                        >
                          {deleteActionId === _id ? (
                            <CircularProgress color="error" size="1rem" />
                          ) : (
                            <DeleteRounded color="error" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </Stack>
      ) : (
        <>
          {keyLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box sx={{ margin: "auto" }}>
              <img
                src="no-keys.svg"
                alt="Address Placeholder"
                height={400}
                width="100%"
                style={{ padding: 3 }}
              />
            </Box>
          )}
        </>
      )}
    </NewAppContainer>
  );
};

export default Keys;
