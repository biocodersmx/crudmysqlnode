const express = require('express');

const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());


// Mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chacaloco22',
    database: 'node20_mysql'
});

//Checar conexion

connection.connect(error =>{
    if (error) throw error;
    console.log('DATAB OK');
});

// Routes
app.get('/',(req,res)=>{
    res.send('Mi API');
});

app.get('/costumers',(req, res)=>{
    const sql = 'SELECT * FROM clientes';
    connection.query(sql,(error,results)=>{
       if (error) throw error;
       if(results.length > 0){
        res.json(results);
       } else{
        res.send('No hay resultados');
       }
    })
  
});

app.get('/costumers/:id',(req, res)=>{
    const {id }= req.params
    const sql = `SELECT * FROM clientes WHERE id = ${id} `;
    connection.query(sql,(error,result)=>{
        if (error) throw error;
        if(result.length > 0){
         res.json(result);
        } else{
         res.send('No hay resultados');
        }
    })
  });

app.post('/add',(req, res)=>{
    const sql = 'INSERT INTO clientes SET ? '
    const clienteObj = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad
    }
    connection.query(sql, clienteObj, error => {
        if (error) throw error;
        res.send('Cliente Agregado');
    })
});

app.put('/update/:id', (req,res)=>{
    const {id } = req.params;
    const {nombre, ciudad} = req.body;
    const sql = `UPDATE clientes SET nombre = '${nombre}', ciudad = '${ciudad}' WHERE id =${id}`;
    connection.query(sql,  error => {
        if (error) throw error;
        res.send('Cliente Actualizado');
    })
});

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM clientes WHERE id = ${id}`;
    connection.query(sql,  error => {
        if (error) throw error;
        res.send('Cliente Eliminado');
    })
});

app.listen(PORT,()=> console.log(`Server running ${PORT}`));