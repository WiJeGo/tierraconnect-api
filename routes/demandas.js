const express = require("express")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Demanda:
 *       type: object
 *       required:
 *         - producto
 *         - cantidad
 *         - precioMaximo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado
 *         producto:
 *           type: string
 *           description: Producto solicitado
 *         cantidad:
 *           type: integer
 *           description: Cantidad requerida
 *         precioMaximo:
 *           type: number
 *           description: Precio máximo dispuesto a pagar
 *       example:
 *         id: 1
 *         producto: "Quinua Blanca"
 *         cantidad: 1000
 *         precioMaximo: 8.0
 */

const demandas = [
  {
    id: 1,
    producto: "Quinua Blanca",
    cantidad: 1000,
    unidad: "kg",
    precioMaximo: 8.0,
    ubicacion: "Lima",
    comprador: "Distribuidora Nacional SAC",
    estado: "activa",
  },
]

let nextId = 2

/**
 * @swagger
 * /api/demandas:
 *   get:
 *     summary: Lista todas las demandas de compra activas
 *     tags: [Demandas]
 *     responses:
 *       200:
 *         description: Lista de demandas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Demanda'
 */
router.get("/", (req, res) => {
  res.json(demandas)
})

/**
 * @swagger
 * /api/demandas:
 *   post:
 *     summary: Publicar una nueva demanda de compra
 *     tags: [Demandas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Demanda'
 *     responses:
 *       201:
 *         description: Demanda creada exitosamente
 */
router.post("/", (req, res) => {
  const nueva = {
    id: nextId++,
    ...req.body,
    fechaPublicacion: new Date().toISOString().split("T")[0],
    estado: "activa",
  }
  demandas.push(nueva)
  res.status(201).json(nueva)
})

module.exports = router
