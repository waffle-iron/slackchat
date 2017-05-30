const express = require('express');
const moment = require('moment');
const Visitor = require('./../../models/Visitor');


const router = express.Router();

function padVisitorData(visitors) {
  // Pad the visitors in case this is
  // a new account
  let lastDate = moment().format('YYYY-MM-DD');
  if (visitors[0]) {
    lastDate = visitors[0].x;
  }
  for (let i = visitors.length; i < 7; i += 1) {
    lastDate = moment(lastDate).subtract(1, 'days').format('YYYY-MM-DD');
    visitors.push({ x: lastDate, y: 0 });
  }
  return visitors.reverse();
}

router.get('/:teamId', (req, res) => {
  const { teamId } = req.params;

  const aggregationPipeline = [
    {
      $group: {
        _id: {
          day: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$created',
            },
          },
        },
        count: { $sum: 1 },
      },
    }, {
      $project: {
        _id: 0,
        x: '$_id.day',
        y: '$count',
      },
    },
  ];

  const allChatsQuery = Visitor.aggregate([
    {
      $match: {
        teamId,
        created: {
          $gt: new Date(Date.now() - (24 * 60 * 60 * 1000 * 7)),
        },
        'lastConversation.missed': false,
        'lastConversation.started': { $ne: null },
      },
    }, ...aggregationPipeline]);

  const missedChatsQuery = Visitor.aggregate([
    {
      $match: {
        teamId,
        created: {
          $gt: new Date(Date.now() - (24 * 60 * 60 * 1000 * 7)),
        },
        'lastConversation.missed': true,
        'lastConversation.started': { $ne: null },
      },
    }, ...aggregationPipeline]);

  const allVisitorsQuery = Visitor.aggregate([
    {
      $match: {
        teamId,
        created: {
          $gt: new Date(Date.now() - (24 * 60 * 60 * 1000 * 7)),
        },
      },
    }, ...aggregationPipeline]);

  Promise.all([allChatsQuery, missedChatsQuery, allVisitorsQuery]).then((results) => {
    res.send({
      allChats: padVisitorData(results[0]),
      missedChats: padVisitorData(results[1]),
      allVisitors: padVisitorData(results[2]),
    });
  });
});

module.exports = router;
