import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  const [dataHasilCleaning, setdataHasilCleaning] = useState([
    {
      konten: 'Rumah Sunda',
      jumlah_akses_konten: 6.0,
      durasi_konten: 1,
    },
    {
      konten: 'Rumah Sunda',
      jumlah_akses_konten: 6.0,
      durasi_konten: 1,
    },
    {
      konten: 'Rumah Sunda',
      jumlah_akses_konten: 6.0,
      durasi_konten: 1,
    },
    {
      konten: 'Rumah Sunda',
      jumlah_akses_konten: 6.0,
      durasi_konten: 1,
    },
  ]);

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
 

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">Konten</StyledTableCell>
            <StyledTableCell align="right">Jumlah Akses Konten</StyledTableCell>
            <StyledTableCell align="right">Durasi Akses Konten</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataHasilCleaning.map((row, i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{i++}</StyledTableCell>
              <StyledTableCell align="right">{row.konten}</StyledTableCell>
              <StyledTableCell align="right">{row.jumlah_akses_konten}</StyledTableCell>
              <StyledTableCell align="right">{row.durasi_konten}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
