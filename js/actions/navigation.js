/**
* @flow
*/

'use strict';

import type {Action} from './types';

// type Tab = 'popular' | 'characters' | 'comics' | 'events' | 'series' | 'stories';
import type {Tab} from '../reducers';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),
};
