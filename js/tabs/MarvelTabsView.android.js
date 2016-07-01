/**
* @providesModule MarvelTabsView
* @flow
*/

'use strict';

var React = require('react');
var Navigator = require('Navigator');
var CharactersContentView = require('./characters/CharactersContentView');
var AboutContentView = require('./about/AboutContentView');
var StyleSheet = require('StyleSheet');
var MarvelDrawerLayout = require('MarvelDrawerLayout');
var View = require('View');
var MenuItem = require('./MenuItem');
var Text = require('Text');
var Image = require('Image');
var MarvelInfoView = require('MarvelInfoView');

var {connect} = require('react-redux');
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
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelected(tab: Tab) {
    if(this.props.tab !== tab) {
      this.props.onTabSelected(tab);
    }

    this.refs.drawer.closeDrawer();
  }

  renderNavigationView() {
    return (
      <View style={styles.navigation}>
        <Image style={styles.head} source={require('./img/head_2.png')}/>
        <MenuItem title="CHARACTERS"
          selected={this.props.tab === 'characters'}
          icon={require('./img/batman.png')}
          selectedIcon={require('./img/batmancolor.png')}
          onPress={this.onTabSelected.bind(this, 'characters')}
          />
        <MenuItem title="ABOUT"
          selected={this.props.tab === 'about'}
          icon={require('./img/shield.png')}
          selectedIcon={require('./img/shieldcolor.png')}
          onPress={this.onTabSelected.bind(this, 'about')}
          />
        <View style={{flex:1}} />
        <MarvelInfoView />
      </View>
    );
  }

  renderContent() {
    switch(this.props.tab) {
      case 'characters':
        return (
          <CharactersContentView navigator={this.props.navigator}/>
        );
      case 'about':
        return (
          <AboutContentView navigator={this.props.navigator}/>
        );
    }
  }

  render() {
    return (
      <MarvelDrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </MarvelDrawerLayout>
    );
  }
}

MarvelTabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

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

var styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  head:{
    width: 290,
    height: 200,
  },

  navigation: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
});

module.exports = connect(select, actions)(MarvelTabsView);
