const express = require('express')
const sql = require('mssql')

const schema = require('./graphql/schema')
const resolverF = require('./graphql/resolvers')
const { graphqlHTTP } = require('express-graphql')

const productos = require('./routes')



//configuraciones
const app = express()
app.use(express.json());
app.set('port', process.env.PORT || 3000)

//base de datos
const dbOptions = {
    user: 'sa',
    password: 'Str0ng_P4ssw0rd!',
    server: 'sqlserver',
    database: 'Productos',
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};



//Conexion del api con la base de datos
sql.connect(dbOptions)
    .then(pool => {
        console.log('Se ha conectado a SQL Server');

        //Ruta principal
        app.get('/', (req, res)=>{
            res.send('Bienvenido a mi API')
        });

        //Ruta de la api
        app.use('/api/productos', productos(pool));

        //Graph
        app.use('/graphql', graphqlHTTP({
            schema,
            rootValue: resolverF(pool),
            graphiql: true
        }));

        //Puerto
        app.listen(app.get('port'), ()=> {
            console.log('server running on port', app.get('port'))
        });
    })
    .catch(err => {
        console.error('Error de conexion: ', err);
    });