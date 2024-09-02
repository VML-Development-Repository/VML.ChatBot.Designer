const express = require('express');
const {
  getFlowchartLines,
  getFlowcharts,
  setFlowchartLine,
  setFlowchart,
} = require('../controllers/flowchartController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// router.get('/flowchartLines', authMiddleware, getFlowchartLines);
// router.get('/flowcharts', authMiddleware, getFlowcharts);
// router.post('/flowchartLines', authMiddleware, setFlowchartLine);
// router.post('/flowcharts', authMiddleware, setFlowchart);

router.get('/flowchartLines', getFlowchartLines);
router.get('/flowcharts', getFlowcharts);
router.post('/flowchartLines', setFlowchartLine);
router.post('/flowcharts', setFlowchart);

module.exports = router;
