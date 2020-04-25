const twilioClient = require('../twilio');
const log = require('debug')('app:TwilioController');

module.exports = {
  getAvailableNumbers: async (req, res, next) => {
    const { areaCode } = req.body;

    try {
      const localNumbers = await twilioClient
        .availablePhoneNumbers('US')
        .local.list({
          // inRegion: "AR", // in future may want to account for state?
          areaCode: areaCode || 470,
          smsEnabled: true,
          excludeAllAddressRequired: true,
          limit: 7,
        });

      res.json(localNumbers);
    } catch (err) {
      next(err);
    }
  },
};
