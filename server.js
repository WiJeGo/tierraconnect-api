const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const productosRoutes = require("./routes/productos")
const demandasRoutes = require("./routes/demandas")
const tecnicosRoutes = require("./routes/tecnicos")

const app = express()
const PORT = process.env.PORT || 3000
const PUBLIC_IP = process.env.PUBLIC_IP || 'localhost';

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TierraConnect API",
      version: "1.0.0",
      description: "API REST para la plataforma de conexión agropecuaria TierraConnect",
      contact: {
        name: "Soporte TierraConnect",
        email: "soporte@tierraconnect.com",
      },
    },
    servers: [
      {
        url: `http://0.0.0.0:${PORT}`,
        description: "Servidor de Producción/Despliegue CI/CD",
      },
    ],
  },
  apis: ["./routes/*.js"], // Archivos donde buscará la documentación
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Rutas
app.use("/api/productos", productosRoutes)
app.use("/api/demandas", demandasRoutes)
app.use("/api/tecnicos", tecnicosRoutes)

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    mensaje: "TierraConnect API v1.0",
    descripcion: "API REST para conectar productores agropecuarios con distribuidores",
    endpoints: {
      productos: "/api/productos",
      demandas: "/api/demandas",
      tecnicos: "/api/tecnicos",
    },
    estado: "Activo",
    version: "1.0.0",
  })
})

// Ruta de health check para CI/CD
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.path,
  })
})

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor TierraConnect corriendo en http://${PUBLIC_IP}:${PORT}`);
  console.log(`Servidor TierraConnect corriendo en http://${PUBLIC_IP}:${PORT}/api-docs`);
});

module.exports = app
