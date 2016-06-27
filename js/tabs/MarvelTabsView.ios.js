/**
* @providesModule MarvelTabsView
* @flow
*/

'use strict';

var React = require('react');
var Navigator = require('Navigator');
var CharactersContentView = require('./characters/CharactersContentView');
var SearchView = require('./characters/SearchView');
var AboutView = require('./about/AboutContentView');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var {connect} = require('react-redux');
var F8Colors = require('F8Colors');
var {switchTab} = require('../actions');

import type {Tab} from '../reducers/navigation';

class MarvelTabsView extends React.Component {
  props: {
    tab: Tab;
    navigator: Navigator;
    onTabSelected: (tab: Tab) => void;
  }

  constructor(props) {
    super(props);
  }

  onTabSelected(tab: Tab) {
    if(this.props.tab !== tab) {
      this.props.onTabSelected(tab);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor={F8Colors.darkText}>
        <TabBarItemIOS
          title="CHARACTER"
          selected={this.props.tab === 'character'}
          onPress={this.onTabSelected.bind(this, 'character')}
          icon={require('./img/batman.png')}
          selectedIcon={require('./img/shieldcolor.png')}>
          <CharactersContentView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="SEARCH"
          selected={this.props.tab === 'search'}
          onPress={this.onTabSelected.bind(this, 'search')}
          icon={require('./img/batman.png')}
          selectedIcon={require('./img/shieldcolor.png')}>
          <SearchView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="ABOUT"
          selected={this.props.tab === 'about'}
          onPress={this.onTabSelected.bind(this, 'about')}
          icon={require('./img/shield.png')}
          selectedIcon={require('./img/shieldcolor.png')}>
          <AboutView navigator={this.props.navigator}/>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

function select(store) {
  return {
    tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelected: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(MarvelTabsView);
