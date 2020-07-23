import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SyncIcon from "@material-ui/icons/Sync";
// import StepButton from '@material-ui/core/StepButton';

import firebase from "../../config/firebase";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SyncIcon />,
    2: <DeleteOutlineIcon />,
    3: <AssessmentIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Ambil Data", "Pembersihan Data", "Hasil Analisis Korelasi"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Ambil Data";
    case 1:
      return "Pembersihan Data";
    case 2:
      return "Hasil Analisis Korelasi";
    default:
      return "Unknown step";
  }
}

export default function CustomizedTables() {
  const classes = useStyles();

  const [dataHasilCleaning, setdataHasilCleaning] = useState([]);

  useEffect(() => {
    // const rootref = firebase.database().ref();
    // const userRef = rootref.child("users");
    // var data_tidakbersih = [];
    // userRef.once("value", (snap) => {
    //   snap.forEach((row) => {
    //     var array_key = Object.keys(row.val().log);
    //     array_key.forEach(key => {
    //       data_tidakbersih.push({
    //         konten: row.val().log[key].Items_Log,
    //         jumlah_akses_konten: row.val().log[key].Items_Interval,
    //         durasi_konten: row.val().log[key].Date,
    //       });
    //     });
    //   });
    //   setdataHasilCleaning(data_tidakbersih);
    // });
    console.log(activeStep);
    getUncleanData()
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleGetCleanData = () => {
    const rootref = firebase.database().ref();
    const cleanRef = rootref.child("cleaning_data");
    var data_bersih = [];
    cleanRef.once("value", (snap) => {
      snap.forEach((row) => {
          data_bersih.push({
            konten: row.val().konten,
            jumlah_akses_konten: row.val().tgl_akses,
            durasi_konten: row.val().durasi_akses,
            user_id: row.val().user_id
          });
      });
      setdataHasilCleaning(data_bersih);
    });
  }

  const getUncleanData = () => {
    const rootref = firebase.database().ref();
    const userRef = rootref.child("users");
    var data_tidakbersih = [];
    userRef.once("value", (snap) => {
      snap.forEach((row) => {
        var array_key = Object.keys(row.val().log);
        array_key.forEach(key => {
          data_tidakbersih.push({
            konten: row.val().log[key].Items_Log,
            jumlah_akses_konten: row.val().log[key].Items_Interval,
            durasi_konten: row.val().log[key].Date,
          });
        });
      });
      setdataHasilCleaning(data_tidakbersih);
    });
  }

  const getkorelasi_ = () => {
    const rootref = firebase.database().ref();
    const cleanRef = rootref.child("korelasi_data");
    var data_bersih = [];
    cleanRef.once("value", (snap) => {
      snap.forEach((row) => {
          data_bersih.push({
            konten: row.val().konten_satu,
            jumlah_akses_konten: row.val().konten_dua,
            durasi_konten: row.val().korelasi,
          });
      });
      setdataHasilCleaning(data_bersih);
    });
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep == 0) {
      handleGetCleanData();
    }else if(activeStep == 1) {
      getkorelasi_()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log("akses konten : ", activeStep)
    if (activeStep == 2) {
      handleGetCleanData();
    }else if(activeStep == 1) {
      getUncleanData()
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const konten_ = () => {
    if (activeStep <= 1) {
      return 'Konten'
    }else {
      return 'Konten Satu'
    }
  }

  const jumlahAksesKonten_ = () => {
    if (activeStep <= 1) {
      return 'Jumlah Akses Konten'
    }else {
      return 'Konten Dua'
    }
  }

  const korelasi_ = () => {
    if (activeStep <= 1) {
      return 'Durasi Akses Konten'
    }else {
      return 'Korelasi'
    }
  }


  const tableCondition_ = () => {
    if (activeStep == 1) {
      return (
        <Table className={classes.table} aria-label="customized table"> 
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="center">
                 User ID
                </StyledTableCell>
                <StyledTableCell align="center">
                 Konten
                </StyledTableCell>
                <StyledTableCell align="center">
                  Durasi Konten
                </StyledTableCell>
                <StyledTableCell align="center">
                 Tgl Akses
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataHasilCleaning.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i+1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.user_id}</StyledTableCell>
                  <StyledTableCell align="center">{row.konten}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.durasi_konten}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.jumlah_akses_konten}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            
          </Table>
      )
    } else {
      return (
        <Table className={classes.table} aria-label="customized table">
            
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="center">
                  {konten_()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {jumlahAksesKonten_()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {korelasi_()}
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataHasilCleaning.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i+1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.konten}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.jumlah_akses_konten}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.durasi_konten}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            
          </Table>
      )
    }
  }

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SyncIcon />}
        >
          Sinkron Data
        </Button>
      </div>

      <div
        style={{ overflowY: "scroll", height: "500px", position: "relative" }}
      >
        <TableContainer component={Paper}>
            {tableCondition_()}
        </TableContainer>
      </div>

      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
