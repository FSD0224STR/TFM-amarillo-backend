const userModel = require('../models/user.model')

const getUser = async (req, res) => {
    const user = await userModel.find()
    console.log('get user')
    res.status(202).json(user)
}

const addUser = (req, res) => {
    userModel.create(req.body)
    .then(user => res.status(202).json(user))
    .catch(err => res.status(500).json(err.errorResponse.errmsg))
}

module.exports = { getUser, addUser }  