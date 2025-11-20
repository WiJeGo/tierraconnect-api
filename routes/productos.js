const express = require("express")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombre
 *         - categoria
 *         - precio
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del producto
 *         nombre:
 *           type: string
 *           description: Nombre del producto agrícola
 *         categoria:
 *           type: string
 *           description: Categoría (Tubérculos, Granos, Frutas, etc.)
 *         precio:
 *           type: number
 *           description: Precio por unidad
 *         ubicacion:
 *           type: string
 *           description: Lugar de origen
 *       example:
 *         id: 1
 *         nombre: "Papas Yungay"
 *         categoria: "Tubérculos"
 *         precio: 2.50
 *         ubicacion: "Cusco"
 */

// Almacenamiento en memoria (simulación de BD)
const productos = [
  {
    id: 1,
    nombre: "Papas Yungay",
    categoria: "Tubérculos",
    cantidad: 500,
    unidad: "kg",
    precio: 2.5,
    ubicacion: "Cusco",
    departamento: "Cusco",
    productor: "Juan Pérez",
    fechaPublicacion: "2025-01-15",
    estado: "disponible",
  },
  {
    id: 2,
    nombre: "Café Orgánico",
    categoria: "Granos",
    cantidad: 200,
    unidad: "kg",
    precio: 15.0,
    ubicacion: "Junín",
    departamento: "Junín",
    productor: "María López",
    fechaPublicacion: "2025-01-18",
    estado: "disponible",
  },
]

let nextId = 3

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Retorna la lista de todos los productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: departamento
 *         schema:
 *           type: string
 *         description: Filtrar por departamento
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
// GET - Listar todos los productos
router.get("/", (req, res) => {
  const { departamento, categoria } = req.query
  let resultado = [...productos]

  if (departamento) {
    resultado = resultado.filter((p) => p.departamento.toLowerCase() === departamento.toLowerCase())
  }
  if (categoria) {
    resultado = resultado.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase())
  }

  res.json(resultado)
})

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 */
// POST - Crear nuevo producto
router.post("/", (req, res) => {
  const { nombre, categoria, cantidad, precio, ubicacion } = req.body

  if (!nombre || !categoria || !cantidad || !precio) {
    return res.status(400).json({ error: "Faltan campos obligatorios" })
  }

  const nuevo = {
    id: nextId++,
    ...req.body,
    fechaPublicacion: new Date().toISOString().split("T")[0],
    estado: "disponible",
  }

  productos.push(nuevo)
  res.status(201).json(nuevo)
})

module.exports = router
