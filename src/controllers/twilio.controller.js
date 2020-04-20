const twilioClient = require('../twilio');
const log = require('debug')('app:TwilioController');

module.exports = {
  getAvailableNumbers: async (req, res, next) => {
    const { areaCode } = req.body;

    console.log('here');
    console.log(areaCode);
    log(areaCode);
    try {
      const localNumbers = await twilioClient
        .availablePhoneNumbers('US')
        .local.list({
          // inRegion: "AR", // in future may want to account for state?
          areaCode: areaCode || 404,
          smsEnabled: true,
          excludeAllAddressRequired: true,
          limit: 7,
        });
      log(localNumbers);

      console.log('here');
      res.json(localNumbers);
    } catch (err) {
      debug(err);
      next(err);
    }
  },
};
