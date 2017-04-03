'use strict';
require('dotenv').config();

// const twitterController = require('../controllers/twitter-controller');
const twitterClient = require('../clients/twitter-client');
const filters = ['go', 'golang', 'node', 'javascript', 'nodejs', 'devops', 'part time', 'parttime', 'freelance', 'full stack', 'fullstack'];

module.exports = function(robot) {
    // robot.hear(/(#)?sendremote(s)?(.*)|(remote(s)?\?)/, twitterController.new);
    const nodeStream = twitterClient.stream('user');

    nodeStream.on('data', function(event) {
      let shouldSend = false;
        filters.forEach(function(filter) {
            if(event.text.toLower().indexOf(filter.toLower()) >= 0) {
               shouldSend = true;
            }
        });
      if (shouldSend) {
        robot.send({ room: process.env.DEFAULT_CHANNEL }, event.text);
      }
    });
    nodeStream.on('error', function(err) {
        throw err;
    });
}
