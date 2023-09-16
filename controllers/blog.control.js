
const Blog = require("../models/blog.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("blog")
const fs = require("fs")

 
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

  updateBlog: async (req, res) => {
    console.log(req.file)
    try {  
      if (req.file) {
        let deletePath = req.file.path 
        fs.unlinkSync()
         var imagePath = `/api/blog/${req.file.filename}`
         title = "updated"
      }

      console.log(req.body._id);
      await  Blog.findByIdAndUpdate(req.body._id, {...req.body , image:imagePath} , {new:true})
      console.log(blog);
      
      await blog.save()
      res.send()
     
    } catch (error) {
         logger.error(error.message)
         res.status(500).send({ message: error.message} ) 
    }  

  },

  deleteBlog: async (req, res) => {
    try {
      let id = req.params
      await Blog.findByIdAndDelete(id)
      res.send()
      
    }catch (error) {
         logger.error(error.message)
         res.status(500).send({ message: error.message} ) 
    }  

  }


  


    
 }


module.exports = blogController ;


