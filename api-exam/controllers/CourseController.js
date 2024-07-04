const Course = require('../models/Course');


const createCourse=async(req,res)=>{
    try{
        console.log(req.body);
        let course = new Course(req.body);
        course= await course.save();
        res.status(200).send({success:true,message:"Course Created Successfully",data:" "});
    }
    catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"error ... ",data:''});
    }
}


const getCourseList=async(req,res)=>{
    try{
        console.log(req.query.name , 'req.query.name');
        let name  = req.query.name ;
        // let courses = await Course.find({});
        let courses = await Course.find({ courseFullName : { $regex : new RegExp(name.toLowerCase() , 'i' ) }});
        console.log(courses, 'courses for branch...');
        res.status(200).send({ success:true,message:"Course Created Successfully", data:courses });
    }
    catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"error ... ",data:''});
    }
}


const getCourseForEdit=async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id,'id');
        let course = await Course.findOne({_id:id});
        console.log(course,'course');
        res.status(200).send({ success : true , message : 'Get courses for edit ... ' , data : course });
    }
    catch(err){
        console.log(err);
        res.status(500).send({ success : false , message : 'error ... ' , data : '' });
    }
}


const updateCourse=async(req,res)=>{
    try{
        let id= req.params.id;
        console.log(id,'id');
        let course =await Course.findOne({ _id : id });
        course.courseCode=req.body.courseCode;
        course.courseFullName=req.body.courseFullName;
        course.courseNickName=req.body.courseNickName;
        course.courseDuration=req.body.courseDuration;
        course.courseMode=req.body.courseMode;
        course.affiliatedUniversity=req.body.affiliatedUniversity;
        await course.save();
        res.status(200).send({success:true,message:"Course updated ... ",data:course})
    }
    catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"error ... ",data:''})
    }
}



const  deleteCourse=async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id,'id')
        let course = await Course.deleteOne({_id:id});
        console.log(course,'course')
        res.status(200).send({ success : true , message : '' , data : '' })
    }
    catch(err){
        res.status(500).send({ success : false , message : " " , data : '' })
    }
}



const getCourses = async (req,res)=>
{  
    try {
        let courses = await Course.find({} , '_id, courseFullName')
        console.log(courses , 'courses');
        res.status(200).send({success : true , message : "" , data : courses })
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , message : " OOPS ERROR " , data : ''})
    }
}



module.exports={
    createCourse,
    getCourseList,
    getCourseForEdit,
    updateCourse,
    deleteCourse,
    getCourses
    
}