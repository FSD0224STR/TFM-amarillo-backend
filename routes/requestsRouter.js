const { Router } = require("express");
const {
    getRequests,
    getRequestsId,
    updateRequests,
    deleteRequests,
} = require("../controllers/requestsController");
const { authenticatedToken } = require("../controllers/userController");

const requestsRouter = Router();

requestsRouter.get("/", authenticatedToken, getRequests);
requestsRouter.get("/:id?", authenticatedToken, getRequestsId);
requestsRouter.put("/:id?", authenticatedToken, updateRequests);
requestsRouter.delete("/:id?", authenticatedToken, deleteRequests);

module.exports = { requestsRouter };
