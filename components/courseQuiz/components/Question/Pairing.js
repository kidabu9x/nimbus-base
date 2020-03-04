/* eslint-disable react/prop-types */
import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  left: {
    width: "30%"
  },
  right: {
    width: "70%"
  },
  gridColumn: {
    width: "45%",
    height: "100%",
    "&.connector": {
      width: "10%"
    }
  },
  fullGridColumn: {
    width: "100%"
  },
  item: {
    textAlign: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    border: "1px solid " + grey[400],
    cursor: "grabbing"
  },
  itemConnector: {
    height: "100%",
    display: "flex",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center"
  }
});

const getAnswer = answer => {
  return answer ? answer : "-";
};

class Pairing extends Component {
  render() {
    const { classes, answers, pairingAnswers, tempPairingAnswers } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.grid}>
          <div className={classes.left}>
            {Array.from(answers).map(answer => {
              return (
                <div key={answer._id} className={classes.grid}>
                  <div className={classes.fullGridColumn}>
                    <div className={classes.item}>
                      {getAnswer(answer.answer)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={classes.right}>
            {[...Array(pairingAnswers.length)]
              .map((_, index) => index)
              .map(index => {
                const temp = tempPairingAnswers[index];
                const pair = pairingAnswers[index];
                return (
                  <div className={classes.grid} key={index}>
                    <div className={classes.gridColumn}>
                      <div className={classes.item}>
                        {getAnswer(temp.answer)}
                      </div>
                    </div>

                    <div className={`${classes.gridColumn} connector`}>
                      <div className={classes.itemConnector}>-</div>
                    </div>

                    <div className={classes.gridColumn}>
                      <div className={classes.item}>
                        {getAnswer(pair.answer)}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Pairing);
