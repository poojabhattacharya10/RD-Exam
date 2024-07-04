const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const ExamSchema = new Schema({
    examId: { type: String, required: true },
    examName: { type: String, required: true  },
    examType:  { type: String, default: 'Training', enum: ['Training', 'Academic'] },
    status:  { type: String, default: 'Active', enum: ['Active', 'Disabled'] },
    progessiveId: { type: Number, default: 1 },
    isQuestionUloaded: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date
});
ExamSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Exam', ExamSchema);