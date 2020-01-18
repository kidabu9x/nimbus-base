import React from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Card from "./Card";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(8, 0),
    padding: theme.spacing(0, 8)
  },
  brandText: {
    textAlign: "center",
    width: "100%"
  },
  cards: {
    marginTop: theme.spacing(2),
    flexGrow: 1
  }
}));

const Section1 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.brandText}>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Các sự kiện
        </Typography>
      </div>
      <Grid container className={classes.cards} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Card />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Section1;
