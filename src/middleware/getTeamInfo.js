module.exports = async (req, res, next) => {
  console.log(req.params);
  console.log('teamId is ', req.params.teamId);
  console.log('calling this middleware');
  next();
};
