import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent:'space-between', marginRight:'16px', marginTop:'16px' }}>
      <form className={classes.root} noValidate autoComplete="off" style={{marginLeft:'67%'}}>
        <div>
        <TextField
            id="outlined-textarea"
            label="Minimum Support"
            placeholder="Example : 0.3"
            multiline
            variant="outlined"
          />
          <TextField
            id="outlined-textarea"
            label="Minimum Confidence"
            placeholder="Example : 0.7"
            multiline
            variant="outlined"
          />
        </div>
      </form>
      <div style={{marginTop:'16px', height: '32px'}}>
      <Button variant="contained" color="primary">
        Proses
      </Button>
      </div>
     
    </div>
  );
}
