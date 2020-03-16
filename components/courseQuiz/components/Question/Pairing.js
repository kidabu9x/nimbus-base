/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  middle: {
    width: "5%"
  },
  right: {
    width: "65%"
  },
  gridColumn: {
    width: "47%",
    "&.connector": {
      width: "6%"
    }
  },
  fullGridColumn: {
    width: "100%"
  },
  item: {
    padding: theme.spacing(1, 0),
    display: "flex",
    height: "100%"
  },
  itemClone: {
    display: "none!important"
  },
  itemInner: {
    textAlign: "center",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    border: "1px solid " + grey[400],
    cursor: "grabbing",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemConnector: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const getAnswer = answer => {
  return answer ? answer : "-";
};

const Item = ({ classes, answer, isClone }) => {
  return (
    <div className={`${classes.item} ${isClone ? classes.itemClone : ""}`}>
      <div className={`${classes.itemInner}`}>
        <Typography variant="body2">{getAnswer(answer.answer)}</Typography>
      </div>
    </div>
  );
};

const ItemConnector = ({ classes }) => {
  return (
    <div className={classes.itemConnector}>
      <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24">
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="black"
          strokeWidth="2"
        ></line>
      </svg>
    </div>
  );
};

class Pairing extends Component {
  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    console.log(source);

    return;
  };
  render() {
    const { classes, answers, pairingAnswers, tempPairingAnswers } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.root}>
          <div className={classes.grid}>
            <Droppable droppableId="droppable" isDropDisabled={true}>
              {provided => (
                <div className={classes.left} ref={provided.innerRef}>
                  {Array.from(answers).map((answer, index) => {
                    return (
                      <Draggable
                        key={answer._id}
                        draggableId={answer._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Fragment>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={classes.grid}
                            >
                              <div className={classes.fullGridColumn}>
                                <Item classes={classes} answer={answer} />
                              </div>
                            </div>
                            {snapshot.isDragging && (
                              <Item
                                classes={classes}
                                answer={answer}
                                isClone={false}
                              />
                            )}
                          </Fragment>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className={classes.middle}></div>

            <div className={classes.right}>
              {[...Array(pairingAnswers.length)]
                .map((_, index) => index)
                .map(index => {
                  const temp = tempPairingAnswers[index];
                  const pair = pairingAnswers[index];
                  return (
                    <div className={classes.grid} key={index}>
                      <div className={classes.gridColumn}>
                        <Item classes={classes} answer={temp} />
                      </div>

                      <div className={`${classes.gridColumn} connector`}>
                        <ItemConnector classes={classes} />
                      </div>

                      <div className={classes.gridColumn}>
                        <Item classes={classes} answer={pair} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default withStyles(styles)(Pairing);
