const express =require('express')
const router= express.Router();
const CourseController = require('../controllers/CourseController');

router.post('/course/create',(req,res)=>{
    CourseController.createCourse(req,res)
})
router.get('/courses/list',(req,res)=>{
    CourseController.getCourseList(req,res)
})
router.get('/course/for/edit/:id',(req,res)=>{
    CourseController.getCourseForEdit(req,res)
})
router.put('/course/update/:id',(req,res)=>{
    CourseController.updateCourse(req,res)
})
router.delete('/course/delete/:id',(req,res)=>{
    CourseController.deleteCourse(req,res)
})


router.get('/courses',(req,res)=>{
    CourseController.getCourses(req,res)
})


module.exports=router;