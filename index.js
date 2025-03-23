const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//connection to data base
const db = mysql.createConnection({
  host: "localhost",
  // port: "3306",
  user: "root",
  password: "Ytpseqecushefdlt28:20",
  database: "empleados",
});

//creación de petención de guardado
app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  db.query(
    "INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado registrado exitosamente");
      }
    }
  );
});

//Listado de datos

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
