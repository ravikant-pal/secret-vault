import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import moment from "moment";
import {
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  TextField,
  Tooltip,
} from "@material-ui/core";
import ConfirmDialog from "./ConfirmDialog";

import * as service from "../services/service";

import * as Constants from "../constants";

const useStyles = makeStyles((theme) => ({
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  fabButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 35,
    margin: "auto",
    left: "50%",
    transform: "translateX(-50%)",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Keys = ({ setSelectedKeyId }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [showSecretKeys, setShowSecretKeys] = useState(false);
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [key, setKey] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const saveKey = () => {
    axios
      .post(`${Constants.BASE_URL}/keys/new`, {
        userId: service.getUserId(),
        name: key,
      })
      .then((res) => {
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
    axios
      .delete(`${Constants.BASE_URL}/keys/${service.getUserId()}/${id}`)

      .then((res) => {
        console.log(res);
        setKeys(keys.filter((k) => k._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleAddKeyAsSecret = (id) => {
    axios
      .patch(`${Constants.BASE_URL}/keys/make-secret/${id}`)
      .then((res) => {
        setKeys(
          keys.map((k) => {
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
    axios
      .get(`${Constants.BASE_URL}/keys/all/${service.getUserId()}`)
      .then((res) => {
        console.log(res);
        setKeys(res.data.keys);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper>
      <List>
        <ListItem
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
        >
          <ListItemText
            disableTypography
            primary={<Typography variant="h6">Keys</Typography>}
          />

          {show && (
            <ListItemSecondaryAction>
              <Tooltip title="Show or hide secret keys" placement="left" arrow>
                <IconButton
                  edge="end"
                  aria-label="show-hidden"
                  onClick={() => setShowSecretKeys(!showSecretKeys)}
                >
                  {showSecretKeys ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
      </List>

      <List>
        {keys.map(({ _id, name, updatedAt, is_secret }) => (
          <React.Fragment key={_id}>
            {_id === 1730 && (
              <ListSubheader className={classes.subheader}>Today</ListSubheader>
            )}
            {_id === 3 && (
              <ListSubheader className={classes.subheader}>
                Yesterday
              </ListSubheader>
            )}
            {(!is_secret || (is_secret && showSecretKeys)) && (
              <ListItem button onClick={() => setSelectedKeyId(_id)}>
                <ListItemAvatar>
                  <Avatar>
                    <VpnKeyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={`Last modified - ${moment(updatedAt).format(
                    "LLLL"
                  )}`}
                />

                <ListItemSecondaryAction>
                  {!is_secret && (
                    <Tooltip title="Make secret key" placement="left" arrow>
                      <IconButton
                        edge="end"
                        aria-label="add-to-secret"
                        onClick={() => handleAddKeyAsSecret(_id)}
                      >
                        <AddCircleOutlineRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete" placement="top" arrow>
                    <IconButton
                      edge="end"
                      aria-label="delete-key"
                      onClick={() => handleDeleteKey(_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
      <Tooltip title="Add a new key">
        <Fab
          color="secondary"
          variant="extended"
          size="medium"
          aria-label="add new key"
          className={classes.fabButton}
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon className={classes.extendedIcon} /> Add
        </Fab>
      </Tooltip>
      <ConfirmDialog
        title="Add a new key"
        open={open}
        setOpen={setOpen}
        onConfirm={saveKey}
        cancelLable={"Cancel"}
        submitLable={"Add"}
      >
        <TextField
          error={errMsg ? true : false}
          autoFocus
          helperText={errMsg}
          label="Enter a key"
          variant="outlined"
          value={key}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              saveKey();
            }
          }}
          onChange={handleKeyChange}
        />
      </ConfirmDialog>
    </Paper>
  );
};

export default Keys;
