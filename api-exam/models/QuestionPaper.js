const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const QuestionPaperSchema = new Schema({
    exam: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questionNo: { type: Number, required: true  },
    questionDescription:  { type: String, required: true },
    isOptionAHasImage: { type: Boolean, default: false },
    optionA:  { type: String, required: true },
    isOptionBHasImage: { type: Boolean, default: false },
    optionB:  { type: String, required: true },
    isOptionCHasImage: { type: Boolean, default: false },
    optionC:  { type: String, required: true },
    isOptionDHasImage: { type: Boolean, default: false },
    optionD:  { type: String, required: true },
    numberOfCorrectAnswer: { type: Number, default: 1  },
    corretAnswer: [{ type: String }],
    createdAt: Date,
    updatedAt: Date
});
QuestionPaperSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);