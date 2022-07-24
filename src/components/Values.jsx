import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
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
import "./values.css";
import axios from "axios";
import moment from "moment";
import { InputAdornment } from "@mui/material";

import * as Constants from "../constants";

const Values = ({ selectedKeyId, setSelectedKeyId }) => {
  const classes = useStyles();

  const [copiedId, setCopiedId] = useState(false);
  // const [idTobeDeleted, setIdTobeDeleted] = useState(false);
  const [key, setKey] = useState({});
  // const [open, setOpen] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");

  const handelCopyMsg = (val) => {
    navigator.clipboard.writeText(val.value);
    setCopiedId(val.id);
    setTimeout(() => {
      setCopiedId(false);
    }, 2000);
  };

  const deleteValue = (idTobeDeleted) => {
    setDeleteLoading(true);
    axios
      .delete(`${Constants.BASE_URL}/values/${key._id}/${idTobeDeleted}`)

      .then((res) => {
        setDeleteLoading(false);
        setValues(values.filter((v) => v._id !== idTobeDeleted));
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSumbmit = () => {
    setSendLoading(true);
    if (value) {
      axios
        .post(`${Constants.BASE_URL}/values/new`, {
          keyId: key._id,
          value,
        })
        .then((res) => {
          setSendLoading(false);
          setValues([res.data, ...values]);
          setValue("");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(`${Constants.BASE_URL}/keys/${selectedKeyId}`)
      .then((res) => {
        setKey(res.data);
        setValues(res.data.values);
      })
      .catch((err) => console.log(err));
  }, [selectedKeyId]);

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
              {Object.keys(key).length !== 0 ? (
                key.name
              ) : (
                <CircularProgress color="inherit" size="1rem" />
              )}
            </Typography>
          }
        />
      </ListItem>
      <Paper className={classes.messagesBody}>
        {values.map((val) => (
          <div className={classes.messageRowRight} key={val._id}>
            <div className={classes.messageOrange}>
              <p className={classes.messageContent}>{val.value}</p>
              <div className={classes.messageTimeStampRight}>
                {moment(val.updatedAt).format("LLLL")}
              </div>

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
                    color="secondary"
                    aria-label="delete-value"
                    component="span"
                    onClick={() => deleteValue(val._id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <CircularProgress color="secondary" size="1rem" />
                    ) : (
                      <DeleteIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
        {/* <ConfirmDialog
          title="Delete Value ?"
          open={open}
          setOpen={setOpen}
          onConfirm={deleteValue}
        >
          Are you sure you want to delete this value?
        </ConfirmDialog> */}
      </Paper>
      {/* Text Input */}
      <div className={classes.wrapForm}>
        <Tooltip title="Enter a value">
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Send">
                    <IconButton
                      size="small"
                      aria-label="send value"
                      onClick={handleSumbmit}
                      variant="text"
                      color="secondary"
                    >
                      {sendLoading ? (
                        <CircularProgress color="secondary" size="1rem" />
                      ) : (
                        <SendIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        {/* <Tooltip title="Send">
          <IconButton
            color="secondary"
            aria-label="send value"
            component="div"
            size="small"
            onClick={handleSumbmit}
          >
            <SendIcon />
          </IconButton>
        </Tooltip> */}
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
