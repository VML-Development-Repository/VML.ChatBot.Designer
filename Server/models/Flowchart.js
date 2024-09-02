const { strict } = require('assert');
const mongoose = require('mongoose');


const FlowchartLine = mongoose.model('FlowchartLine', new mongoose.Schema({}, { strict: false }));
const Flowchart = mongoose.model('Flowchart', new mongoose.Schema({}, { strict: false }));

module.exports = { FlowchartLine, Flowchart };
