/**
 * @flow
 */

'use strict';

function warn(error) {
  console.warn(error.message || error);
  throw error; // To let the caller handle the rejection
}

// function parseStore(store: any) {
//   return function doNext(next: any) {
//     // global.LOG('next', next);
//     return function doAction(action: any) {
//       global.LOG('action', next, action.then, action);
//       if(typeof action.then === 'function') {
//         Promise.resolve(action).then(next, warn)
//       } else {
//         next(action);
//       }
//     }
//   }
// }

module.exports = (store: any) => (next: any) => (action: any) =>
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action);
