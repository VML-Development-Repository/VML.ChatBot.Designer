const { FlowchartLine, Flowchart } = require('../models/Flowchart');

exports.getFlowchartLines = async (req, res) => {
  try {
    const flowchartLines = await FlowchartLine.find();
    res.json(flowchartLines);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flowchart lines' });
  }
};

exports.getFlowcharts = async (req, res) => {
  try {
    const flowcharts = await Flowchart.find();
    res.json(flowcharts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flowcharts' });
  }
};

exports.setFlowchartLine = async (req, res) => {
  const { name, flowchartLines, verified } = req.body;
  try {
    const updatedFlowchartLine = await FlowchartLine.findOneAndUpdate(
      { name },
      { flowchartLines, verified },
      { new: true, upsert: true } // `new: true` returns the updated document, `upsert: true` creates a new document if none is found
    );

    res.status(201).json(updatedFlowchartLine);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save flowchart line', error: error.message });
  }
};

exports.setFlowchart = async (req, res) => {
  const { name, flowchart, verified } = req.body;
  try {
    const updatedFlowchart = await Flowchart.findOneAndUpdate(
      { name },
      { flowchart, verified },
      { new: true, upsert: true } // `new: true` returns the updated document, `upsert: true` creates a new document if none is found
    );

    res.status(201).json(updatedFlowchart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save flowchart', error: error.message });
  }
};

