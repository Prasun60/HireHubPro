const Log = require('../models/logs');
const moment = require('moment');

exports.getLogs = async(req, res, next) => {
    try {
        const { level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId, fromdate, todate } = req.query;
        if (level || message || resourceId || timestamp || traceId || spanId || commit || parentResourceId||fromdate||todate) {
            let filter = {};
            if (level) filter.level = level;
            if (message) filter.message = message;
            if (resourceId) filter.resourceId = resourceId;
            // if (timestamp) filter.timestamp = timestamp;
            if (traceId) filter.traceId = traceId;
            if (spanId) filter.spanId = spanId;
            if (commit) filter.commit = commit;
            if (parentResourceId) filter['metadata.parentResourceId'] = parentResourceId;

            if (timestamp && moment(timestamp, 'YYYY-MM-DD', true).isValid()) {
                const startOfDay = moment(timestamp).startOf('day'); // Start of the provided date
                const endOfDay = moment(timestamp).endOf('day'); // End of the provided date
          
                filter.timestamp = {
                  $gte: startOfDay.toISOString(), // Greater than or equal to the start of the day
                  $lte: endOfDay.toISOString(),   // Less than or equal to the end of the day
                };
              }

              if (fromdate && todate && moment(fromdate, 'YYYY-MM-DD', true).isValid() && moment(todate, 'YYYY-MM-DD', true).isValid()) {
                const startOfDay = moment(fromdate).startOf('day'); // Start of the provided fromdate
                const endOfDay = moment(todate).endOf('day'); // End of the provided todate
          
                filter.timestamp = {
                  $gte: startOfDay.toISOString(), // Greater than or equal to the start of the day
                  $lte: endOfDay.toISOString(), // Less than or equal to the end of the day
                };
              }

              const documents = await Log.find(filter)
              .limit(100) // Limiting the number of documents to 100
              .sort({ timestamp: -1 });

              res.status(200).json({
                message: 'Logs fetched successfully!',
                logs: documents,
              });
        }
        else {
            Log.find().then(documents => {
                res.status(200).json({
                    message: 'Logs fetched successfully!',
                    logs: documents
                });
            });
        }

    }
    catch (err) {
        console.log(err);
    }
}

exports.createLog = (req, res, next) => {
    const log = new Log({
        level: req.body.level,
        message: req.body.message,
        resourceId: req.body.resourceId,
        timestamp: req.body.timestamp,
        traceId: req.body.traceId,
        spanId: req.body.spanId,
        commit: req.body.commit,
        metadata: req.body.metadata
    });
    log.save().then(createdLog => {
        res.status(201).json({
            message: 'Log added successfully!',
            logId: createdLog._id,
            log: createdLog
        });
    });
}

exports.deleteLog = (req, res, next) => {
    Log.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Log deleted!' });
    });
}


exports.getLogsByLevel = (req, res, next) => {
    Log.find({ level: req.params.level }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByResourceId = (req, res, next) => {
    Log.find({ resourceId: req.params.resourceId }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByTimestamp = (req, res, next) => {
    Log.find({ timestamp: req.params.timestamp }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}


exports.getLogsByTraceId = (req, res, next) => {
    Log.find({ traceId: req.params.traceId }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsBySpanId = (req, res, next) => {
    Log.find({ spanId: req.params.spanId }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByCommit = (req, res, next) => {
    Log.find({ commit: req.params.commit }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByParentResourceId = (req, res, next) => {
    Log.find({ 'metadata.parentResourceId': req.params.parentResourceId }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByResourceIdAndTimestamp = (req, res, next) => {
    Log.find({ resourceId: req.params.resourceId, timestamp: req.params.timestamp }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

exports.getLogsByResourceIdAndTraceId = (req, res, next) => {
    Log.find({ resourceId: req.params.resourceId, traceId: req.params.traceId }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

// query logs on the basis of date range

exports.getLogsByDateRange = (req, res, next) => {
    Log.find({ timestamp: { $gte: req.params.startDate, $lte: req.params.endDate } }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

// query logs

exports.getLogsByQuery = (req, res, next) => {
    Log.find({ $and: [{ timestamp: { $gte: req.params.startDate, $lte: req.params.endDate } }, { level: req.params.level }, { resourceId: req.params.resourceId }, { traceId: req.params.traceId }, { spanId: req.params.spanId }, { commit: req.params.commit }, { 'metadata.parentResourceId': req.params.parentResourceId }] }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}

// search logs
exports.searchLogs = (req, res, next) => {
    Log.find({ $text: { $search: req.params.searchText } }).then(documents => {
        res.status(200).json({
            message: 'Logs fetched successfully!',
            logs: documents
        });
    });
}




