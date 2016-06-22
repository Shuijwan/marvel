/**
* @flow
*/

'use strict';

const mainentryActions = require('./mainentry');
const navigationActions = require('./navigation');

module.exports = {
  ...mainentryActions,
  ...navigationActions,
};
