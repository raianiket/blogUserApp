const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://devuser:abcd1234@cluster0-5b1ty.mongodb.net/blogApp?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
})
