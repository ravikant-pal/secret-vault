import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import ConfirmDialog from "./ConfirmDialog";
import "./values.css";
import * as service from "../services/service";

const Values = ({ selectedKeyId, setSelectedKeyId }) => {
  const classes = useStyles();

  const [copiedId, setCopiedId] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(service.getValuesForKey(selectedKeyId));
  const [value, setValue] = useState("");

  const handelCopyMsg = (val) => {
    navigator.clipboard.writeText(val.value);
    setCopiedId(val.id);
    setTimeout(() => {
      setCopiedId(false);
    }, 2000);
  };

  const deleteValue = () => {
    service.deleteValue(selectedKeyId, selectedId);
    setValues(service.getValuesForKey(selectedKeyId));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSumbmit = () => {
    if (value) {
      service.addValue(selectedKeyId, value);
      setValues(service.getValuesForKey(selectedKeyId));
      setValue("");
    }
  };

  return (
    <Paper className={classes.paper}>
      <ListItem>
        <ListItemAvatar>
          <Tooltip title="Back">
            <IconButton
              edge="end"
              aria-label="add-to-secret"
              onClick={() => setSelectedKeyId(false)}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="h6">
              {service.getKeyById(selectedKeyId).keyName}
            </Typography>
          }
        />
      </ListItem>
      <Paper className={classes.messagesBody}>
        {values.map((val) => (
          <div className={classes.messageRowRight} key={val.id}>
            <div className={classes.messageOrange}>
              <p className={classes.messageContent}>{val.value}</p>
              <div className={classes.messageTimeStampRight}>{val.lmd}</div>

              <div className={classes.actionBtns}>
                <Tooltip title={val.id === copiedId ? "copied!" : "copy"}>
                  <IconButton
                    color="default"
                    aria-label="cancel"
                    component="span"
                    onClick={() => handelCopyMsg(val)}
                  >
                    <FileCopyOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="default"
                    aria-label="delete-value"
                    component="span"
                    onClick={() => {
                      setOpen(true);
                      setSelectedId(val.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
        <ConfirmDialog
          title="Delete Value ?"
          open={open}
          setOpen={setOpen}
          onConfirm={deleteValue}
        >
          Are you sure you want to delete this value?
        </ConfirmDialog>
      </Paper>
      {/* Text Input */}
      <div className={classes.wrapForm}>
        <TextField
          id="standard-text"
          placeholder="Type a value"
          className="inputRounded"
          variant="outlined"
          size="small"
          value={value}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              handleSumbmit();
            }
          }}
          fullWidth
        />
        <Tooltip title="Send">
          <IconButton
            color="secondary"
            aria-label="send value"
            component="div"
            size="small"
            onClick={handleSumbmit}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "100vw",
      height: "90vh",
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },

    messagesBody: {
      width: "100%",
      overflowY: "scroll",
      height: "calc( 100% - 130px )",
    },

    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f8e896",
      width: "90%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #f8e896",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #dfd087",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px",
      },
    },

    messageContent: {
      padding: 10,
      margin: "1px",
      paddingRight: 80,
      position: "relative",
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "400",
      marginTop: "10px",
      bottom: "3px",
      right: "5px",
    },
    actionBtns: {
      position: "absolute",
      top: 0,
      left: "auto",
      right: 0,
    },
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `auto`,
    },
    wrapText: {
      width: "100%",
    },
  })
);

export default Values;
