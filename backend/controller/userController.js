import AsyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//@desc     Auth user & get Token
//@route    POST/api/users/login
//@acess    public

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid  Email or Password')
  }
})

//@desc     Register a new user
//@route    POST/api/users/login
//@acess    public

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  //Here we check user Exist or not by Email
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exist')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)

    throw new Error('Invalid user data')
  }
})

//@desc     Get user profile
//@route    GET/api/users/profile
//@acess    Private

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Update user profile
//@route    GET/api/users/profile
//@acess    Private

const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Get all users
//@route    GET/api/users
//@acess    Private/admin

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

//@desc     Delete user
//@route    DELETE/api/users/:id
//@acess    Private/Admin

const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Removed Sucessfully!' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
}
