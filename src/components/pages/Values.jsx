import React, { useEffect, useState } from "react";
import "./values.css";

import Box from "@mui/material/Box";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteRounded,
  FileCopyRounded,
  SendRounded,
} from "@mui/icons-material";
import NewAppContainer from "../layout/AppContainer";
import moment from "moment";
import styled from "@emotion/styled";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useKey from "../../hooks/useKey";
import { useNavigate } from "react-router-dom";

const SVTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Values = () => {
  const axiosPrivate = useAxiosPrivate();
  const { selectedKeyId } = useKey();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);
  const [key, setKey] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [valuesLoading, setValuesLoading] = useState(false);
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
    axiosPrivate
      .delete(`/values/${key._id}/${idTobeDeleted}`)

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
      axiosPrivate
        .post(`/values/new`, {
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
    if (selectedKeyId) {
      setValuesLoading(true);
      axiosPrivate
        .get(`/keys/${selectedKeyId}`)
        .then((res) => {
          setKey(res.data);
          setValues(res.data.values);
          setValuesLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/keys");
    }
  }, [selectedKeyId]);
  return (
    <NewAppContainer title={key?.name} showBackButton>
      {values.length ? (
        <>
          <Box
            sx={{
              overflowY: "scroll",
              height: "480px",
            }}
          >
            {values.map((val) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                key={val._id}
              >
                <Box
                  sx={{
                    position: "relative",
                    marginRight: "20px",
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#88cc85",
                    textAlign: "left",
                    font: "400 .9em 'Open Sans', sans-serif",
                    border: "1px solid #88cc85",
                    borderRadius: "10px",
                    "&:after": {
                      content: "''",
                      position: "absolute",
                      width: "0",
                      height: "0",
                      borderTop: "15px solid #88cc85",
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
                      borderTop: "17px solid #88cc85",
                      borderLeft: "16px solid transparent",
                      borderRight: "16px solid transparent",
                      top: "-1px",
                      right: "-17px",
                    },
                  }}
                >
                  <Typography variant="body1">{val.value}</Typography>
                  <Box
                    sx={{
                      fontSize: ".85em",
                      fontWeight: "400",
                      marginTop: "10px",
                    }}
                  >
                    {moment(val.updatedAt).format("LLLL")}
                  </Box>

                  <Box
                    sx={{
                      top: 0,
                      right: 0,
                      left: "auto",
                      position: "absolute",
                      backgroundColor: "#88cc85",
                    }}
                  >
                    <Tooltip title={val.id === copiedId ? "copied!" : "copy"}>
                      <IconButton
                        color="default"
                        aria-label="cancel"
                        component="span"
                        onClick={() => handelCopyMsg(val)}
                      >
                        <FileCopyRounded />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        aria-label="delete-value"
                        component="span"
                        onClick={() => deleteValue(val._id)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <CircularProgress color="error" size="1rem" />
                        ) : (
                          <DeleteRounded />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          {valuesLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box sx={{ margin: "auto", minHeight: "460px" }}>
              <img
                src="no-values.svg"
                alt="Address Placeholder"
                height={450}
                width="100%"
                style={{ padding: 3 }}
              />
            </Box>
          )}
        </>
      )}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          p: 1,
          right: 0,
        }}
      >
        <Tooltip title="Enter a value">
          <SVTextField
            id="value-field"
            placeholder="Type a value ..."
            className="inputRounded"
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 10,
            }}
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
                        <CircularProgress color="primary" size="1rem" />
                      ) : (
                        <SendRounded color="primary" />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </Box>
    </NewAppContainer>
  );
};

export default Values;
