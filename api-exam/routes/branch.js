const express = require('express')
const router=express.Router();
const BranchController=require('../controllers/BranchController');


router.post('/branch/create',(req,res)=>{
    BranchController.createBranch(req,res)
})

router.get('/branches',(req,res)=>{
    console.log("in branch routes...")
    BranchController.getBranches(req,res)
})

router.get('/branch/for/edit/:id',(req,res)=>{
    BranchController.getBranchForEdit(req,res)
})

router.put('/branch/update/:id',(req,res)=>{
    BranchController.updateBranch(req,res)
})

router.delete('/branch/delete/:id',(req,res)=>{
    BranchController.deleteBranch(req,res)
})

router.get('/branches/list',(req,res)=>{
    BranchController.getBranchMap(req,res)
})


module.exports=router