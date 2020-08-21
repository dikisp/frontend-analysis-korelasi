import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Stop } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function hitungOpacity(val, max) {
  return (val * max) / 100 / 100;
}

function createData(pakaian, makanan, alatMusik, senjata, rumahAdat) {
  return { pakaian, makanan, alatMusik, senjata, rumahAdat };
}

const rows = [
  createData(
    { text: "Frozen yoghurt", val: hitungOpacity(0, 100) },
    { text: "Gingerbread", val: hitungOpacity(60, 100) },
    { text: "Cupcake", val: hitungOpacity(30, 100) },
    { text: "Eclair", val: hitungOpacity(60, 100) },
    { text: "Eclair", val: hitungOpacity(10, 100) }
  ),
  createData(
    { text: "Frozen1", val: hitungOpacity(60, 100) },
    { text: "Ginger", val: hitungOpacity(20, 100) },
    { text: "Cup", val: hitungOpacity(50, 100) },
    { text: "Ec", val: hitungOpacity(20, 100) },
    { text: "Ec", val: hitungOpacity(70, 100) }
  ),
  createData(
    { text: "Frozen2", val: hitungOpacity(30, 100) },
    { text: "Ginger", val: hitungOpacity(80, 100) },
    { text: "Cup", val: hitungOpacity(100, 100) },
    { text: "Ec", val: hitungOpacity(20, 100) },
    { text: "Ec", val: hitungOpacity(30, 100) }
  ),
  createData(
    { text: "Frozen3", val: hitungOpacity(30, 100) },
    { text: "Ginger", val: hitungOpacity(10, 100) },
    { text: "Cup", val: hitungOpacity(70, 100) },
    { text: "Ec", val: hitungOpacity(20, 100) },
    { text: "Ec", val: hitungOpacity(30, 100) }
  ),
];

export default function HeatMap() {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Pakaian</TableCell>
              <TableCell align="center">Makanan</TableCell>
              <TableCell align="center">Alat Musik</TableCell>
              <TableCell align="center">Senjata</TableCell>
              <TableCell align="center">Rumah Adat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.pakaian.text}>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: `rgba(29, 233, 182, ${row.pakaian.val})`,
                  }}
                  component="th"
                  scope="row"
                >
                  {row.pakaian.text}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: `rgba(29, 233, 182, ${row.makanan.val})`,
                  }}
                  align="center"
                >
                  {row.makanan.text}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: `rgba(29, 233, 182, ${row.alatMusik.val})`,
                  }}
                  align="center"
                >
                  {row.alatMusik.text}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: `rgba(29, 233, 182, ${row.senjata.val})`,
                  }}
                  align="center"
                >
                  {row.senjata.text}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: `rgba(29, 233, 182, ${row.rumahAdat.val})`,
                  }}
                  align="center"
                >
                  {row.rumahAdat.text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: "40px 24px", textAlign: "right" }}>
        Kurang
        <Stop style={{ color: "rgba(29, 233, 182, 0)" }} />
        <Stop style={{ color: "rgba(29, 233, 182, 0.25)" }} />
        <Stop style={{ color: "rgba(29, 233, 182, 0.5)" }} />
        <Stop style={{ color: "rgba(29, 233, 182, 0.75)" }} />
        <Stop style={{ color: "rgba(29, 233, 182, 1)" }} />
        Banyak
      </div>
    </div>
  );
}
