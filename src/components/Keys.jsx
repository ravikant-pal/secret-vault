import React, { useState } from "react";
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

const messages = [
  {
    id: 1,
    keyName: "Brunch this week?",
    lastModified: "Last modified - Jan 9, 2014",
    secret: false,
  },

  {
    id: 2,
    keyName: "Brunch this week?",
    lastModified: "Last modified - Jan 9, 2014",
    secret: false,
  },
  {
    id: 3,
    keyName: "Brunch this week?",
    lastModified: "Last modified - Jan 9, 2014",
    secret: false,
  },
  {
    id: 4,
    keyName: "Brunch this week?",
    lastModified: "Last modified - Jan 9, 2014",
    secret: true,
  },
  {
    id: 5,
    keyName: "Brunch this week?",
    lastModified: "Last modified - Jan 9, 2014",
    secret: false,
  },
];

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
  const [keys, setKeys] = useState(service.getAllKeys());
  const [key, setKey] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const saveKey = () => {
    if (!key) {
      setErrMsg("Field is empty.");
    } else {
      setOpen(false);
      service.addNewKey(key);
      setKeys(service.getAllKeys());
      setKey("");
    }
  };
  const handleKeyChange = (e) => {
    setKey(e.target.value);
    setErrMsg("");
  };
  const handleDeleteKey = (id) => {
    service.deleteKey(id);
    setKeys(service.getAllKeys());
  };

  const handleAddKeyAsSecret = (id) => {
    console.log("id===>", id);
    service.setKeyAsSecret(id);
    setKeys(service.getAllKeys());
  };

  return (
    <Paper>
      <List>
        <ListItem
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
        >
          <ListItemText
            disableTypography
            primary={<Typography variant="h5">Keys</Typography>}
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
        {keys.map(({ id, keyName, lmd, secret }) => (
          <React.Fragment key={id}>
            {id === 1730 && (
              <ListSubheader className={classes.subheader}>Today</ListSubheader>
            )}
            {id === 3 && (
              <ListSubheader className={classes.subheader}>
                Yesterday
              </ListSubheader>
            )}
            {(!secret || (secret && showSecretKeys)) && (
              <ListItem button onClick={() => setSelectedKeyId(id)}>
                <ListItemAvatar>
                  <Avatar>
                    <VpnKeyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={keyName}
                  secondary={`Last modified - ${lmd}`}
                />

                <ListItemSecondaryAction>
                  {!secret && (
                    <Tooltip title="Make secret key" placement="left" arrow>
                      <IconButton
                        edge="end"
                        aria-label="add-to-secret"
                        onClick={() => handleAddKeyAsSecret(id)}
                      >
                        <AddCircleOutlineRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete" placement="top" arrow>
                    <IconButton
                      edge="end"
                      aria-label="delete-key"
                      onClick={() => handleDeleteKey(id)}
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
