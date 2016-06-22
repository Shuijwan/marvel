/**
* @flow
*/

'use strict';

import type {Action} from './types';

type Tab = 'Comics' | 'Story';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),
};
