const Branch = require('../models/Branch');
const Q = require('q');
const Course = require('../models/Course');

const createBranch = async(req,res)=>{
    try{
        console.log(req.body)
        let branch = new Branch(req.body);
        branch = await branch.save();
        res.status(200).send({ success : true , message :'Branch created successfully' , data : branch })
    }catch(err){
        console.log(err)
        res.status(500).send({ success : false , message : '' , data : '' })
    }
}

// const getBranches= async(req,res)=>{
//     try{
//         console.log(req.query.name,'req.query.name')
//         let name = req.query.name;
//        // let branches = await Branch.find({}).populate('course');
//        // console.log(branches, 'branches');
//        let branches= await Branch.find({ branchFullName: { $regex: new RegExp(name.toLowerCase(), "i")}}).populate('course')
//         res.status(200).send({status:true, message:'Branch created successfully' , data: branches });
//     }catch(err){
        
//         res.status(500).send({status:false, message:'',data:''})
//     }
// }




const getBranches= async(req,res)=>{
    try{
        // console.log(req.query.name,'req.query.name')
        let name = req.query.name;
        console.log(name , 'name');

        let offset= req.query.page ? (req.query.page-1)*req.query.limit : 0;
        console.log(offset);

        let limit = parseInt(req.query.limit ? req.query.limit : 2);
        console.log(limit);
        
        Q.all([
            Branch.countDocuments().exec(),
            Branch.find({branchFullName: {
                $regex: new RegExp(name.toLowerCase(), "i") }}).populate('course').skip(parseInt(offset)).limit(parseInt(limit)).exec()  ])
            .then(function(branches){
                console.log(branches[0])
                return  res.status(200).send({ success : true , message : 'Branch created successfully' , data: branches[1], totalCount: branches[0] });
            })
            .catch(function(err){
                console.log(err.message, 'msg')
                res.status(500).send({ success : false , message : '' , data : err })
            })
        
    }catch(err){
        console.log(err.message, 'msg....')
        res.status(500).send({status:false, message:'',data:err})
    }
      
    
}



const getBranchForEdit = async(req,res) => {
    try{
        console.log("we are here in edit branch")
        let branchId = req.params.id;
        let branch = await Branch.findOne({ _id: branchId});
        console.log(branch, 'branch');
        res.status(200).send({success: true,message: '' , data: branch });
    }catch(err){
        console.log(err);
        res.status(500).send({success: false,message: '' , data:" "})
    }
}

const updateBranch = async(req,res)=>{
    try{
            console.log(req.body);
            let branchId = req.params.id;
            console.log(branchId,'id for update');
            let branch = await Branch.findOne({_id: branchId});
            console.log(branch,'Branch for update')
            branch.branchCode  = req.body.branchCode;
            branch.branchFullName = req.body.branchFullName;
            branch.branchNickName = req.body.branchNickName;
            branch.course = req.body.course;
            branch = await branch.save();
            console.log(" Branch saved succesully..");
            res.status(200).send({success: true , message: '' , data: branch })

    }catch(err){
        res.status(500).send({success: false , message: '' , data:" "})
    }
}

const deleteBranch = async(req,res)=>{
    try{
        let id = req.params.id;
        console.log(id,'id for delete');
        let branch = await Branch.deleteOne({_id:id})
        res.status(200).send({success: true,message: 'Course deleted successfully' , data: branch })

    }catch(err){
        res.status(500).send({success: false,message: '' , data:" "})
    }
}



const getBranchMap=async(req,res)=>{
    try{
        let branches= await Branch.find({}).populate('course');
        console.log(branches,'branch');
        res.status(200).send({success:true,message:" list gett Successfully",data:branches});

    }
    catch(err){
        console.log(err);
        res.status(500).send({ success : false , message : "error ... " , data : err });
    }

}




module.exports={
    createBranch,
    getBranches,
    getBranchForEdit,
    updateBranch,
    deleteBranch,
    getBranchMap
}