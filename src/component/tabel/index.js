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
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListAltSharpIcon from "@material-ui/icons/ListAltSharp";
import TextField from "@material-ui/core/TextField";
import HeatMap from './HeatMap';
import axios from 'axios';

  
// import StepButton from '@material-ui/core/StepButton';
import { withRouter } from "react-router-dom";

import firebase from "../../config/firebase";

// form
// import TextField from './form';
axios.defaults.baseURL = 'https://azure-ta-deployment.azurewebsites.net/';

const useQontoStepIconStyles = makeStyles({
  root: {
    // color: "#eaeaf0",
    color: "#fff000",
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
    3: <ListAltSharpIcon />,
    4: <AssessmentIcon />,
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
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function getSteps() {
  return [
    "Ambil Data",
    "Pembersihan Data",
    "Item Frequenset",
    "Hasil Association Rule",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Ambil Data";
    case 1:
      return "Pembersihan Data";
    case 2:
      return "Item Frequenset";
    case 3:
      return "Hasil Association Rule";
    default:
      return "Unknown step";
  }
}

const CustomizedTables = ({ history }) => {
  const classes = useStyles();
  const [dataHasilCleaning, setdataHasilCleaning] = useState([]);
  const [buttonProcessData, setbuttonProcessData] = useState({})

  useEffect(() => {
    console.log(activeStep);
    getUncleanData();
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
          user_id: row.val().user_id,
        });
      });
      setdataHasilCleaning(data_bersih);
    });
  };

  const getUncleanData = async () => {
    try {
      const uncleanData_ = await axios.get('get-dirty-data');
      const uncleanData = uncleanData_.data
      const data_tidakbersih = []
      var total_content = Object.keys(uncleanData[0]).length

      for(let i=0;i<total_content;i++) {
        data_tidakbersih.push({
                  konten: uncleanData[3][i],
                  jumlah_akses_konten: uncleanData[2][i],
                  durasi_konten: uncleanData[0][i],
          });
      }

      setdataHasilCleaning(data_tidakbersih);
    }catch(err) {
      console.log("Error getUncleanData ", err)
      alert("Error when try get data");
    }
    // const rootref = firebase.database().ref();
    // const userRef = rootref.child("users");
    // var data_tidakbersih = [];
    // userRef.once("value", (snap) => {
    //   snap.forEach((row) => {
    //     var array_key = Object.keys(row.val().log);
    //     array_key.forEach((key) => {
    //       data_tidakbersih.push({
    //         konten: row.val().log[key].Items_Log,
    //         jumlah_akses_konten: row.val().log[key].Items_Interval,
    //         durasi_konten: row.val().log[key].Date,
    //       });
    //     });
    //   });
    //   setdataHasilCleaning(data_tidakbersih);
    // });
  };

  const getkorelasi_ = async (minimumSupport=0.3) => {
    try {
      localStorage.setItem('support', minimumSupport);
      const minimum_supportData_ = await axios.get(`get-itemset/${minimumSupport}`);
      const minimum_supportData = minimum_supportData_.data
      console.log("Minimum Support : ", minimum_supportData)
      const minimum = []
      const total_content = Object.keys(minimum_supportData['support']).length

      for(let i=0;i<total_content;i++) {
        minimum.push({
                  konten: minimum_supportData['itemsets'][i].toString(),
                  jumlah_akses_konten: minimum_supportData['length'][i],
                  durasi_konten: minimum_supportData['support'][i],
        })
      }
      setdataHasilCleaning(minimum);
    }catch(err) {
      console.log("Error getkorelasi_ as minimum Support ", err)
      alert("Error when try get data");
    }
    // const rootref = firebase.database().ref();
    // const cleanRef = rootref.child("itemset");
    // var data_bersih = [];
    // cleanRef.once("value", (snap) => {
    //   snap.forEach((row) => {
    //     data_bersih.push({
    //       konten: row.val().itemsets,
    //       jumlah_akses_konten: row.val().length,
    //       durasi_konten: row.val().support,
    //     });
    //   });
    //   setdataHasilCleaning(data_bersih);
    // });
  };

  const get_ar = async (confidence=0.5) => {
    try {
      localStorage.setItem('confidence', confidence);
      const dataConfidence_ = await axios.get(`get-rules/${localStorage.getItem('support')}/${confidence}`)
      const dataConfidence = dataConfidence_.data
      const total_content = Object.keys(dataConfidence['antecedents']).length
      var confindence = []
      for(let i=0;i<total_content;i++) {
        confindence.push({
          antecedents: dataConfidence['antecedents'][i].toString(),
          confidence: dataConfidence['confidence'][i],
          consequents: dataConfidence['consequents'][i].toString(),
          lift: dataConfidence['lift'][i],
          support: dataConfidence['support'][i],
        })
      }
      setdataHasilCleaning(confindence);
    }catch(err) {
      alert("Erro Getting Data ");
      console.log("Erro getting Data : ", err)
    }
    // const rootref = firebase.database().ref();
    // const cleanRef = rootref.child("ar");
    // var data_bersih = [];
    // cleanRef.once("value", (snap) => {
    //   snap.forEach((row) => {
    //     data_bersih.push({
    //       antecedents: row.val().antecedents,
    //       confidence: row.val().confidence,
    //       consequents: row.val().consequents,
    //       lift: row.val().lift,
    //       support: row.val().support,
    //     });
    //   });
    //   setdataHasilCleaning(data_bersih);
    // });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      handleGetCleanData();
    } else if (activeStep === 1) {
      getkorelasi_();
    } else if (activeStep === 2) {
      get_ar();
    } else if (activeStep === 4) {
      get_ar();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 2) {
      handleGetCleanData();
    } else if (activeStep === 1) {
      getUncleanData();
    } else if (activeStep === 3) {
      getkorelasi_();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    getUncleanData();
  };

  const konten_ = () => {
    if (activeStep <= 1) {
      return "Konten";
    } else {
      return "Item Set";
    }
  };

  const jumlahAksesKonten_ = () => {
    if (activeStep <= 1) {
      return "Durasi Akses";
    } else {
      return "length";
    }
  };

  const korelasi_ = () => {
    if (activeStep <= 1) {
      return "Tanggal Akses";
    } else {
      return "Support";
    }
  };

  const tableCondition_ = () => {
    console.log("activeStep at function tableCondition_ ", activeStep);
    if (activeStep === 4) {
      return <HeatMap />;
    } else if (activeStep === 3) {
      return (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Antecedents</StyledTableCell>
              <StyledTableCell align="center">Consequents</StyledTableCell>
              <StyledTableCell align="center">Support</StyledTableCell>
              <StyledTableCell align="center">Confidence</StyledTableCell>
              <StyledTableCell align="center">Lift</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataHasilCleaning.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.antecedents}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.consequents}
                </StyledTableCell>
                <StyledTableCell align="center">{row.support}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.confidence}
                </StyledTableCell>
                <StyledTableCell align="center">{row.lift}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (activeStep === 1) {
      return (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">User ID</StyledTableCell>
              <StyledTableCell align="center">Konten</StyledTableCell>
              <StyledTableCell align="center">Durasi Konten</StyledTableCell>
              <StyledTableCell align="center">Tgl Akses</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataHasilCleaning.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
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
      );
    } else {
      return (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">{konten_()}</StyledTableCell>
              <StyledTableCell align="center">
                {jumlahAksesKonten_()}
              </StyledTableCell>
              <StyledTableCell align="center">{korelasi_()}</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataHasilCleaning.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
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
      );
    }
  };

  const sinkronData = () => {
    if (activeStep === 0) {
      return (
        <center>
          <div style={{ marginTop: "8px" }}>
            <Button
              onClick={() => getUncleanData()}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SyncIcon />}
            >
              Sinkron Data
            </Button>
          </div>
        </center>
      );
    } else {
      return null;
    }
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        history.push("/sign-in");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const minimumSupport = () => {
    if (activeStep >= 3) {
      return  <TextField
      id="outlined-textarea"
      label="Minimum Confidence"
      placeholder="Example : 0.3"
      onChange={e => {
        setbuttonProcessData({
          score : e.target.value,
          label : 'minimum_confidence'
        })
      }}
      multiline
      variant="outlined"
    />
    } else if (activeStep === 2) {
      return <TextField
      id="outlined-textarea"
      label="Minimum Support"
      placeholder="Example : 0.7"
      onChange={e => {
        setbuttonProcessData({
          score : e.target.value,
          label : 'minimum_support'
        })
      }}
      multiline
      variant="outlined"
    />
    }
  };

  const buttonProcess = () => {
    if (activeStep > 1) {
      return (
        <div 
        onClick={() => {
          if (buttonProcessData.label === 'minimum_support') {
            getkorelasi_(parseFloat(buttonProcessData.score))
          } else {
            get_ar(parseFloat(buttonProcessData.score))
          }
        }}
        style={{marginTop:'16px', height: '32px'}}>
      <Button 
      variant="contained" 
      color="primary">
        Proses
      </Button>
      </div>
      )
    }
  };

  return (
    <div>
      {sinkronData()}

      <div style={{ margin: "10px 5px 5px 5px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "16px",
            marginTop: "16px",
          }}
        >
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            style={{ marginLeft: "67%" }}
          >
            <div>{minimumSupport()}</div>
          </form>
          {buttonProcess()}
        </div>

        <Button
          onClick={() => logout()}
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<ExitToApp />}
        >
          Logout
        </Button>
      </div>

      <div
        style={{
          overflowY: "scroll",
          height: "400px",
          position: "relative",
          margin: "32px",
        }}
      >
        <TableContainer component={Paper}>{tableCondition_()}</TableContainer>
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

        <center>
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
                    Kembali
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Tampilkan Rekomendasi"
                      : "Lanjutkan"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </center>
      </div>
    </div>
  );
};

export default withRouter(CustomizedTables);
