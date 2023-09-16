
const Blog = require("../models/blog.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("blog")

const blogController = {
      crateBlog : async(req, res, next)=> {
        try {
          console.log(req.body)  
          console.log(req.file)
          let newBlog = new Blog({...req.body , owner:req.user._id , date })

          const date = new Date().toISOString()
            console.log(data)
          
          if (req.file) {
            newBlog.image = `/api/blog/${req.file.filename}`
          }
          await newBlog.save()

            res.send()
        }
        catch (error) {
            logger.error(error.message)
            res.status(500).send({ message: error.message} ) 
        }

  },
  getBlog: async (req, res) => {
    try {
      let blogs = await Blog.find({
         owne: req.user._id
      })
      res.send(blogs)
    } catch (error) {
         logger.error(error.message)
         res.status(500).send({ message: error.message} ) 
    }
    
  }
  ,

  updateBlog: async (req,res)=> {
    try {
      let blog = Blog.findByIdAndUpdate(req.body._id, req.body)
      

      await blog.save()
     
    } catch (error) {
         logger.error(error.message)
         res.status(500).send({ message: error.message} ) 
    }  


  }


  


    
 }


module.exports = blogController ;


