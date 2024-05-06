const userModel = require('../models/user.model')

const getUsers = async (req, res) => {
    userModel.find({removedAt: {$eq: null}})
    .then(userDoc => res.status(200).json(userDoc))
    .catch(err => res.status(400).json({'msg': 'Users not found'}))
}

const addUser = async (req, res) => {
    userModel.create(req.body)
    .then(user => res.status(202).json(user))
    .catch(err => res.status(500).json(err.errorResponse.errmsg))
}

const getMyProfile = async (req, res) => {
    userModel.findById(req.params.id)
    .then(userDoc => {
        if (!userDoc) return res.status(404).json({"msg": "User not found"})
        res.status(200).json(userDoc)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

const updateUser = async (req, res) => {
    userModel.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    .then(userDoc => {
        if (!userDoc) return res.status(404).json({"msg": "User not found"})
        res.status(200).json(userDoc)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

const deleteUser = async (req, res) => {
    userModel.findByIdAndUpdate(req.params.id,
        { $set: {removedAt: new Date()} },
        { new: true }
    )
    .then(userDoc => {
        if (!userDoc) return res.status(404).json({"msg": "User not found"})
        res.status(200).json({"msg": "userDoc deleted"})
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

module.exports = { getUsers, addUser, updateUser, deleteUser, getMyProfile }  