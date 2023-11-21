const {
    getLogs,
    createLog,
    deleteLog,
    getLogsByLevel,
    getLogsByResourceId,
    getLogsByTraceId,
    getLogsBySpanId,
    getLogsByTimestamp,    
} = require('../controllers/logscontroller');

const express = require('express');

const router = express.Router();

router.get('/', getLogs);
router.post('/', createLog);
router.delete('/:id', deleteLog);
router.get('/level/:level', getLogsByLevel);
router.get('/resourceId/:resourceId', getLogsByResourceId);
router.get('/traceId/:traceId', getLogsByTraceId);
router.get('/spanId/:spanId', getLogsBySpanId);
router.get('/timestamp/:timestamp', getLogsByTimestamp);

module.exports = router;
