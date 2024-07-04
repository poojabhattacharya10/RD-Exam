const Exam = require('../models/Exam');
const QuestionPaper = require('../models/QuestionPaper');
const { parse } = require('csv-parse');
const asyncLoop = require('node-async-loop');
const fs = require('fs');
function uploadCSV(path) {
    try {
        let stream = fs.createReadStream(path);
        let csvDataColl = [];
        let fileStream = csv.parse(stream).
        on('data', function(data) {
            csvDataColl.push(data);
        })
        stream.pipe(fileStream)
        if(fileStream) {
            console.log(csvDataColl, 'csvDataColl');
        }
    } catch(err) {
        console.log(err.message, 'msg...');
    }

}
function readCSVFile(path) {
    try {
        let fileData = [];
        return new Promise((resolve, reject)=> {
            fs.createReadStream(path)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                fileData.push(Object.assign({}, row));
            })
            .on("end", function () {
                resolve(fileData);
            })
            .on("error", function (error) {
                console.log(error.message);
                reject(error);
            });
        })
    } catch(err) {

   }
}
const getExams = async (req, res) => {
    try {
        let exams = await Exam.find({});
        
        res.status(200).send({ success: true,  data: exams });
    } catch(err) {
        console.log(err.message, 'msg....');
        res.status(500).send({ success: false, message:'somthing went wrong', data: '' });
    }
}
const createExam = async(req, res)=> {
    try {
        
        let examExists;
        let examId = '';
        let progessiveId = 1;
        examExists = await Exam.find({}).sort({ progessiveId:-1 }).limit(1);
       
        if(examExists.length) {
            
            progessiveId = examExists[0].progessiveId + 1;
        } else {
            progessiveId =  1;
        }
        
        if(req.body.examType === 'Training') {
           
           examId = 'TR' + '00' + progessiveId;
           
        } else {
           
            examId = 'AC' + '00' + progessiveId;
        }
        let exam = new Exam(req.body);
        exam.examId = examId;
        exam.progessiveId = parseInt(progessiveId);
        
        exam = await exam.save();
        res.status(200).send({ success: true, data: exam });
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ success: false, message:'somthing went wrong', data: '' });
    }
}
const deleteExam = async (req, res) => {
    try {
        let id = req.params.id;
        let  exam= await Exam.deleteOne({ _id: id });
        res.status(200).send({ success: true,  data: exam });
    } catch(err) {
        console.log(err);
        res.status(500).send({ success: false, message:'somthing went wrong', data: '' });
    }
}
const getExam = async(req, res) => {
    try {
        let id = req.params.id;
        let exam = await Exam.findOne({ _id: id });
        res.status(200).send({ success: true,  data: exam });
    } catch(err) {
        console.log(err);
        res.status(500).send({ success: false, message:'somthing went wrong', data: '' });
    }
}
const uploadQuestionPaper = async(req, res) => {
    try {
        let results = await readCSVFile('./uploads/' + req.files[0].filename);
        if(results.length) {
            asyncLoop(results, async (result, next)=> {
                let questionPaper = new QuestionPaper(result);
                questionPaper.exam = req.body.exam;
                questionPaper.questionNo  = result[0];
                questionPaper.questionDescription  = result[1];
                questionPaper.optionA = result[2];
                questionPaper.optionB = result[3];
                questionPaper.optionC = result[4];
                questionPaper.optionD = result[5];
                questionPaper.corretAnswer.push(result[7]);
                questionPaper = await questionPaper.save();
                next();
            }, async function (err) {
                if(err) {
                    console.log(err.message, 'msg..')
                } else {
                    await Exam.updateOne({ _id: req.body.exam  }, { $set: { isQuestionUloaded : true }});
                    res.status(200).send({ success: true,  data: '' });
                }
            })
        }
    } catch(err) {
        console.log(err)
    }
}
const getQuestions= async (req, res) => {
    try {
        let exam = req.params.id;
        let questions = await QuestionPaper.find({ exam: exam });
        console.log(questions, 'questions');
        res.status(200).send({ success: true,  data: questions });
    } catch(err) {
        console.log(err);
    }
}
module.exports = {
    getExams,
    createExam,
    deleteExam,
    getExam,
    uploadQuestionPaper,
    getQuestions
}

