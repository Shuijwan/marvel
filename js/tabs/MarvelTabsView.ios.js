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

var {connect} = require('react-redux');
var F8Colors = require('F8Colors');
var {switchTab} = require('../actions');

import type {Tab} from '../reducers/navigation';

class MarvelTabsView extends React.Component {
  props: {
    tab: Tab;
    navigator: Navigator;
    onTabSelected: (tab: Tab) => void;
  };

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
        <TabBarIOS.Item
          title="POPULAR"
          selected={this.props.tab === 'characters'}
          onPress={this.onTabSelected.bind(this, 'characters')}
          icon={require('./img/batman.png')}
          renderAsOriginal= {true}
          selectedIcon={require('./img/batmancolor.png')}>
          <CharactersContentView
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="SEARCH"
          selected={this.props.tab === 'search'}
          onPress={this.onTabSelected.bind(this, 'search')}
          renderAsOriginal= {true}
          icon={require('./img/wolve.png')}
          selectedIcon={require('./img/wolvecolor.png')}>
          <SearchView
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="ABOUT"
          selected={this.props.tab === 'about'}
          onPress={this.onTabSelected.bind(this, 'about')}
          renderAsOriginal= {true}
          icon={require('./img/shield.png')}
          selectedIcon={require('./img/shieldcolor.png')}>
          <AboutView navigator={this.props.navigator}/>
        </TabBarIOS.Item>
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
