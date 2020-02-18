/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { GoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Logo from "../../../logo.svg";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    height: "100vh",
    boxSizing: "border-box"
  },
  title: {
    fontSize: 24,
    paddingTop: theme.spacing(2)
  },
  logo: {},
  mailBox: {
    height: "32px",
    marginTop: "8px"
  },
  mailBoxWrapper: {
    borderRadius: "16px",
    padding: "5px 7px 5px 5px",
    alignItems: "center",
    border: "1px solid #dadce0",
    color: "#3c4043",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: ".25px",
    maxWidth: "100%"
  },
  avatarWrapper: {
    marginRight: theme.spacing(1),
    height: "20px",
    borderRadius: "10px"
  },
  avatar: {
    borderRadius: "50%",
    color: "#3c4043",
    display: "block",
    height: "20px",
    width: "20px"
  },
  email: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  inputWrapper: {
    paddingTop: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(5),
    display: "flex"
  },
  actionWrapper: {
    flexGrow: 1,
    textAlign: "left"
  },
  actionWrapperRight: {
    textAlign: "right"
  },
  action: {
    textTransform: "unset"
  }
}));

const ValidateCode = props => {
  const [code, setCode] = useState("k2d2cws3e");
  const { user, loading, codeInvalid, onGetCode, onSwitchAccount } = props;
  const classes = styles();

  const onSubmit = e => {
    e.preventDefault();

    onGetCode(code);
  };

  const onLogoutSuccess = () => {
    onSwitchAccount();
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" width={60} />
      </div>
      <Typography
        className={classes.title}
        variant="h5"
        align="center"
        gutterBottom
      >
        {user.first_name} {user.last_name}
      </Typography>

      <div className={classes.mailBox}>
        <div className={classes.mailBoxWrapper}>
          <div className={classes.avatarWrapper}>
            <img
              className={classes.avatar}
              src={user.avatar}
              alt={user.avatar}
            />
          </div>
          <Typography className={classes.email} variant="body2">
            {user.email}
          </Typography>
        </div>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <div className={classes.inputWrapper}>
          <TextField
            id="code"
            label="Nhập mã"
            margin="normal"
            fullWidth
            variant="outlined"
            helperText={codeInvalid ? "Mã không hợp lệ" : null}
            error={codeInvalid}
            disabled={loading}
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <div className={classes.actionWrapper}>
            <GoogleLogout
              clientId="618592701479-s18h0uo27etuful029664069uubo4ho1.apps.googleusercontent.com"
              onLogoutSuccess={onLogoutSuccess}
              onFailure={() => {}}
              disabled={loading}
              render={renderProps => (
                <Button
                  color="primary"
                  className={classes.action}
                  disabled={renderProps.disabled}
                  onClick={renderProps.onClick}
                >
                  Dùng tài khoản khác
                </Button>
              )}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogout>
          </div>
          <div
            className={`${classes.actionWrapper} ${classes.actionWrapperRight}`}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.action}
              type="submit"
              disableElevation
              disabled={loading}
            >
              Tiếp theo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ValidateCode;
