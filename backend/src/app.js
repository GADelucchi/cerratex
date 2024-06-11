// Imports
const express = require(`express`)
const morgan = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
const routerServer = require(`./routes/index.router`)
const { logger } = require('./config/logger')
const { port } = require("../process/config")

// Instancia
const app = express()

// Configuración
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(cors({
    origin: 'https://cerratex.com.ar',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // headers: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }))
app.use(morgan(`dev`))

// Middleware de terceros
app.use(cookieParser(`P@l@braS3cre3t0`))

// Puerto
const httpServer = app.listen(port, (error) => {
    if (error) logger.error(`Error en el servidor`, error)
    logger.info(`Escuchando en el puerto: ${port}`);
})

// Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de adoptame',
            description: 'Esta es la documentación de adoptame'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)

// Rutas
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(express.static(path.join(__dirname, 'public_html', 'frontend')))
app.use(routerServer)
