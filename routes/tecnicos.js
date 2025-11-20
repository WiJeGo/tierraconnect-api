const express = require("express")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Tecnico:
 *       type: object
 *       required:
 *         - nombre
 *         - especialidad
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado
 *         nombre:
 *           type: string
 *           description: Nombre del profesional
 *         especialidad:
 *           type: string
 *           description: Especialidad técnica
 *         ubicacion:
 *           type: string
 *           description: Zona de trabajo
 *       example:
 *         id: 1
 *         nombre: "Ing. Carlos Mendoza"
 *         especialidad: "Cultivos Andinos"
 *         ubicacion: "Ayacucho"
 */

const tecnicos = [
  {
    id: 1,
    nombre: "Ing. Carlos Mendoza",
    especialidad: "Cultivos Andinos",
    ubicacion: "Ayacucho",
    disponibilidad: "disponible",
  },
]

let nextId = 2

/**
 * @swagger
 * /api/tecnicos:
 *   get:
 *     summary: Lista de técnicos agrícolas disponibles
 *     tags: [Tecnicos]
 *     responses:
 *       200:
 *         description: Lista de técnicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tecnico'
 */
router.get("/", (req, res) => {
  res.json(tecnicos)
})

/**
 * @swagger
 * /api/tecnicos:
 *   post:
 *     summary: Registrar un nuevo técnico
 *     tags: [Tecnicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tecnico'
 *     responses:
 *       201:
 *         description: Técnico registrado exitosamente
 */
router.post("/", (req, res) => {
  const nuevo = {
    id: nextId++,
    ...req.body,
    disponibilidad: "disponible",
  }
  tecnicos.push(nuevo)
  res.status(201).json(nuevo)
})

module.exports = router
