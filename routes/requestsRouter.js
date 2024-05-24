const { Router } = require('express')
const { getRequests, getRequestsId, updateRequests, deleteRequests } = require('../controllers/requestsController')


const requestsRouter = Router()

requestsRouter.get("/", getRequests)
requestsRouter.get("/:id?", getRequestsId)
requestsRouter.put("/:id?", updateRequests)
requestsRouter.delete("/:id?", deleteRequests)

module.exports = { requestsRouter }