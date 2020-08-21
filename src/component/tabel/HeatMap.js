import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Stop } from "@material-ui/icons";
import axios from 'axios';

axios.defaults.baseURL = 'https://azure-ta-deployment.azurewebsites.net/';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function hitungOpacity(val, max) {
//   return (val * max) / 100 / 100;
// }

// function createData(pakaian, makanan, alatMusik, senjata, rumahAdat) {
//   return { pakaian, makanan, alatMusik, senjata, rumahAdat };
// }


export default function HeatMap() {
  const classes = useStyles();  
  const [rows, setrows] = useState([]);
  const [total_tertinggi, settotal_tertinggi] = useState([]);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    getResult()
  }, []);

  function hitungOpacity(val, max) {
    return (val * max) / 100 / 100;
  }
  
  function createData(pakaian, makanan, alatMusik, senjata, rumahAdat) {
    return { pakaian, makanan, alatMusik, senjata, rumahAdat };
  }


  const getResult = async () => {
    try {
      const sort = await axios.get(`get-frequency/${localStorage.getItem('support')}/${localStorage.getItem('confidence')}`);
      const sort_data = sort.data
      var newData = [];
      const array_konten = Object.keys(sort.data);
      for (let a=0;a<array_konten.length;a++) {
        newData.push({
          konten: array_konten[a],
          value : sort_data[array_konten[a]]
        })
      }
      
      const result_rekomen = await axios.get(`get-not-accessed/${localStorage.getItem('support')}/${localStorage.getItem('confidence')}`);
      const rekomendasi = result_rekomen.data;
      const total_rekomendasi = Object.keys(rekomendasi.makanan).length
      var dataResult = {
      "rumah"   :  Object.keys(rekomendasi.rumah),
      "pakaian" :  Object.keys(rekomendasi.pakaian),
      "makanan" :  Object.keys(rekomendasi.makanan),
      "musik"   :  Object.keys(rekomendasi.musik),
      "senjata" :  Object.keys(rekomendasi.senjata)
      }
      var row = [];
      var its_fucking_row = {
        'senjata' : [],
        "pakaian" : [],
        "makanan": [],
        "musik" : [],
        'rumah' : []
      }


      for(let i=0;i<total_rekomendasi;i++) {
          if (rekomendasi['makanan'][dataResult['makanan'][i]]) {
            its_fucking_row.makanan.push({
              konten: dataResult['makanan'][i],
              confidence: rekomendasi['makanan'][dataResult['makanan'][i]]
            })
          }else if (!rekomendasi['makanan'][dataResult['makanan'][i]]) {
            its_fucking_row.makanan.unshift({
              konten: dataResult['makanan'][i],
              confidence: rekomendasi['makanan'][dataResult['makanan'][i]]
            })
          }
        
          if (rekomendasi['pakaian'][dataResult['pakaian'][i]]) {
            its_fucking_row.pakaian.push({
              konten: dataResult['pakaian'][i],
              confidence: rekomendasi['pakaian'][dataResult['pakaian'][i]]
            })
          }else if (!rekomendasi['pakaian'][dataResult['pakaian'][i]]) {
            its_fucking_row.pakaian.unshift({
              konten: dataResult['pakaian'][i],
              confidence: rekomendasi['pakaian'][dataResult['pakaian'][i]]
            })
          }

          if (rekomendasi['rumah'][dataResult['rumah'][i]]) {
            its_fucking_row.rumah.push({
              konten: dataResult['rumah'][i],
              confidence: rekomendasi['rumah'][dataResult['rumah'][i]]
            })
          }else if (!rekomendasi['rumah'][dataResult['rumah'][i]]) {
            its_fucking_row.rumah.unshift({
              konten: dataResult['rumah'][i],
              confidence: rekomendasi['rumah'][dataResult['rumah'][i]]
            })
          }

          if (rekomendasi['musik'][dataResult['musik'][i]]) {
            its_fucking_row.musik.push({
              konten: dataResult['musik'][i],
              confidence: rekomendasi['musik'][dataResult['musik'][i]]
            })
          }else if (!rekomendasi['musik'][dataResult['musik'][i]]) {
            its_fucking_row.musik.unshift({
              konten: dataResult['musik'][i],
              confidence: rekomendasi['musik'][dataResult['musik'][i]]
            })
          }

          if (rekomendasi['senjata'][dataResult['senjata'][i]]) {
            its_fucking_row.senjata.push({
              konten: dataResult['senjata'][i],
              confidence: rekomendasi['senjata'][dataResult['senjata'][i]]
            })
          }else if (!rekomendasi['senjata'][dataResult['makanan'][i]]) {
            its_fucking_row.senjata.unshift({
              konten: dataResult['senjata'][i],
              confidence: rekomendasi['senjata'][dataResult['senjata'][i]]
            })
          }
          
      }

      for(let j=0;j<total_rekomendasi;j++) {
        row.push(createData(
          { text:  its_fucking_row[newData[0].konten][j].konten, val: hitungOpacity(its_fucking_row[newData[0].konten][j].confidence ? 60 : 0 , 100) },
          { text: its_fucking_row[newData[1].konten][j].konten, val: hitungOpacity(its_fucking_row[newData[1].konten][j].confidence ? 60 : 0, 100) },
          { text:its_fucking_row[newData[2].konten][j].konten, val: hitungOpacity(its_fucking_row[newData[2].konten][j].confidence ? 60 : 0, 100) },
          { text: its_fucking_row[newData[3].konten][j].konten, val: hitungOpacity(its_fucking_row[newData[3].konten][j].confidence ? 60 : 0, 100) },
          { text: its_fucking_row[newData[4].konten][j].konten, val: hitungOpacity(its_fucking_row[newData[4].konten][j].confidence ? 60 : 0, 100) }
        ))
      }

      setrows(row);
      newData = newData.sort( function ( a, b ) { return b.value - a.value; } )
      setHeader([
        newData[0].konten,
        newData[1].konten,
        newData[2].konten,
        newData[3].konten,
        newData[4].konten,
      ])
      settotal_tertinggi(newData);

    }catch(err){
      alert("Error getting data")
      console.log("Error : ", err);
    }
  }

  
const jsUcfirst = (string) =>
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  // const table_condition = () => {
  //   console.log(jsUcfirst(highScore[0].konten === 'musik' ? 'Alat Musik' : highScore[0].konten === 'rumah' ? 'Rumah Adat' : highScore[0].konten))
  //   return (
  //       <TableRow>
  //       <TableCell align="center">Hallo</TableCell>
  //       <TableCell align="center">Hallo</TableCell>
  //       <TableCell align="center">Hallo</TableCell>
  //       <TableCell align="center">Hallo</TableCell>
  //       <TableCell align="center">Hallo</TableCell>
  //   </TableRow>
  //   //   <TableRow>
  //   //     <TableCell align="center">{jsUcfirst(highScore[0].konten === 'musik' ? 'Alat Musik' : highScore[0].konten === 'rumah' ? 'Rumah Adat' : highScore[0].konten)}</TableCell>
  //   //     <TableCell align="center">{jsUcfirst(highScore[1].konten === 'musik' ? 'Alat Musik' : highScore[1].konten === 'rumah' ? 'Rumah Adat' : highScore[1].konten)}</TableCell>
  //   //     <TableCell align="center">{jsUcfirst(highScore[2].konten === 'musik' ? 'Alat Musik' : highScore[2].konten === 'rumah' ? 'Rumah Adat' : highScore[2].konten)}</TableCell>
  //   //     <TableCell align="center">{jsUcfirst(highScore[3].konten === 'musik' ? 'Alat Musik' : highScore[3].konten === 'rumah' ? 'Rumah Adat' : highScore[3].konten)}</TableCell>
  //   //     <TableCell align="center">{jsUcfirst(highScore[4].konten === 'musik' ? 'Alat Musik' : highScore[4].konten === 'rumah' ? 'Rumah Adat' : highScore[4].konten)}</TableCell>
  //   // </TableRow>
  //   )
  // }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
         <TableCell align="center">{header[0]}</TableCell>
         <TableCell align="center">{header[1]}</TableCell>
         <TableCell align="center">{header[2]}</TableCell>
          <TableCell align="center">{header[3]}</TableCell>
         <TableCell align="center">{header[4]}</TableCell>
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
