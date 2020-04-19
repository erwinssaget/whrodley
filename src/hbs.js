const path = require('path');
const hbs = require('express-hbs');

hbs.registerHelper('cssAssetPath', function (text, options) {
  const assets = require('../public/parcel-manifest.json');

  return new hbs.SafeString(
    `<link rel="stylesheet" type="text/css" href="${assets[text]}">`
  );
});

hbs.registerHelper('jsAssetPath', function (text, options) {
  const assets = require('../public/parcel-manifest.json');

  return new hbs.SafeString(`<script src="${assets[text]}"></script>`);
});

module.exports = (app) => {
  app.engine(
    'hbs',
    hbs.express4({
      partialsDir: path.resolve(__dirname, '../views/partials'),
      layoutsDir: path.resolve(__dirname, '../views/layout'),
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', path.resolve(__dirname, '../views'));

  return app;
};
