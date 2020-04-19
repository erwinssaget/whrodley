const debug = require('debug')('app:messages-controller');
const config = require('config');
const createError = require('http-errors');
const Message = require('../models/Message');
const twilio = require('twilio');
const Team = require('../models/Team');

module.exports = {
  index: async (req, res, next) => {
    if (req.xhr) {
      const teamId = req.session.user.activeTeamId;

      const team = await Team.query().findById(teamId);

      const messages = await team
        .$relatedQuery('messages')
        .where('team_id', team.id);

      console.log(messages);

      res.json(messages);
      return;
    }

    res.render('messages/index', {
      csrfToken: req.csrfToken(),
    });
  },

  store: async (req, res, next) => {
    const teamId = req.session.user.activeTeamId;

    if (!teamId) {
      throw new createError.NotFound(
        'No team was found for authenticated user.'
      );
    }

    // get the team associated with authenticated user
    const team = await Team.query().findById(teamId);

    const twilioClient = twilio(team.twilio_sid, team.twilio_auth_token);

    const { body } = req.body;

    try {
      const twilioResponse = await twilioClient.messages.create({
        body,
        from: team.phone_number, //'+14048825335',
        to: '+14705297124',
      });

      debug(twilioResponse);

      const message = await Message.query().insert({
        // account_sid: twilioResponse.accountSid,
        team_id: team.id,
        body,
        from: twilioResponse.from,
        to: twilioResponse.to,
        // TODO: add status callback
      });

      res.json(message);
    } catch (error) {
      req.log.error(error);
      next(error);
    }
  },

  twilio_callback: (req, res, next) => {
    console.log(req.body);
    res.json({ test: 'received message' });
  },
};
