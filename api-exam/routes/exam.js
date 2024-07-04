const express = require('express');
const multer = require('multer');
const ExamController = require('../controllers/ExamController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/exam/create', (req, res)=> {
    ExamController.createExam(req, res);
})
router.get('/exams', (req, res)=> {
    ExamController.getExams(req, res);
})
router.get('/exam/:id', (req, res)=> {
    ExamController.getExam(req, res);
})
router.get('/exam/for/edit/:id', (req, res)=> {
    ExamController.getBranchForEdit(req, res);
})
router.put('/edit/branch/:id', (req, res)=> {
    ExamController.editBranch(req, res);
})
router.delete('/exam/:id', (req, res)=> {
   ExamController.deleteExam(req, res);
})
router.post('/exam/:id', (req, res)=> {
    ExamController.deleteExam(req, res);
})
router.post('/upload/quesion/paper',  upload.any(), (req, res)=> {
    ExamController.uploadQuestionPaper(req, res);
})
router.get('/exam/questions/:id', (req, res)=> {
    console.log("here questions..")
    ExamController.getQuestions(req, res);
})
module.exports = router;