const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/Auth')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    console.log('New User: ', user)
    try{
      await user.save()
    //   sendWelcomeEmail(user.email,user.name)
      const token = await user.generateAuthToken()
      // console.log('New token generated: ', token)
      res.status(201).send({user,token})
    } catch(error){
      console.error(error)
      res.status(400).send()
    }
  })

  router.post('/users/login',async (req,res) =>{
      try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
      }catch(error){
      res.send(error)
      }
    })

  router.post('/users/logout', auth, async (req,res) => {
    try{
      req.user.token = ''
  
      await req.user.save()
      res.send()
    }catch(e){
      res.status(500).send()
    }
    })


module.exports = router