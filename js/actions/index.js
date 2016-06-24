/**
* @flow
*/

'use strict';

const mainentryActions = require('./mainentry');
const navigationActions = require('./navigation');
const marvelActions = require('./marvel');

module.exports = {
  ...mainentryActions,
  ...navigationActions,
  ...marvelActions,
};
