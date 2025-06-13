const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/testdb')

// Definição do schema
const userSchema = new mongoose.Schema({
  mail: String,
  typePerson: String,
  name: String,
  cpf: String,
  birth: String,
  socialReason: String,
  cnpj: String,
  openDate: String,
  phone: String,
  password: String
})

const User = mongoose.model('User', userSchema)

// Configuração do swagger-jsdoc
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Cadastro',
    version: '1.0.0',
    description: 'API para cadastro e listagem de usuários'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ]
}

const options = {
  swaggerDefinition,
  apis: ['./index.js'] // o próprio arquivo onde estão as anotações
}

const swaggerSpec = swaggerJSDoc(options)

// Rotas da API com Swagger annotations

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         mail:
 *           type: string
 *         typePerson:
 *           type: string
 *         name:
 *           type: string
 *         cpf:
 *           type: string
 *         birth:
 *           type: string
 *         socialReason:
 *           type: string
 *         cnpj:
 *           type: string
 *         openDate:
 *           type: string
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         mail: usuario@exemplo.com
 *         typePerson: PF
 *         name: João Silva
 *         cpf: 123.456.789-00
 *         birth: 1990-01-01
 *         socialReason: Empresa XYZ
 *         cnpj: 12.345.678/0001-90
 *         openDate: 2020-01-01
 *         phone: 11999999999
 *         password: senha123
 */

/**
 * @swagger
 * /registration:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

app.get('/registration', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Cadastra um novo usuário
 *     requestBody:
 *       description: Dados do usuário para cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Cadastro realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cadastro realizado com sucesso.
 *       400:
 *         description: Falta email ou senha no cadastro.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email e senha são obrigatórios.
 *       500:
 *         description: Erro no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro no servidor.
 */

app.post('/registration', async (req, res) => {
  try {
    const data = req.body

    if (!data.mail || !data.password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' })
    }

    const user = new User(data)
    await user.save()

    res.json({ message: 'Cadastro realizado com sucesso.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro no servidor.' })
  }
})

// Rota para o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
  console.log('Documentação disponível em http://localhost:3000/api-docs')
})
