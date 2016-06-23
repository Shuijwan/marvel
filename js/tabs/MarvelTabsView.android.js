/**
* @providesModule MarvelTabsView
* @flow
*/

'use strict';

var React = require('react');
var Navigator = require('Navigator');
var PopularContentView = require('./popular/PopularContentView');
var CharactersContentView = require('./characters/CharactersContentView');
var ComicsContentView = require('./comics/ComicsContentView');
var EventsContentView = require('./events/EventsContentView');
var SeriesContentView = require('./series/SeriesContentView');
var StoriesContentView = require('./stories/StoriesContentView');
var StyleSheet = require('StyleSheet');
var MarvelDrawerLayout = require('MarvelDrawerLayout');
var View = require('View');

var {connect} = require('react-redux');
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
      <PopularContentView navigator={this.props.navigator}/>
    );
  }

  renderContent() {
    switch(this.props.tab) {
      case 'popular':
        return (
          <PopularContentView navigator={this.props.navigator}/>
        );
      case 'characters':
        return (
          <CharactersContentView navigator={this.props.navigator}/>
        );
      case 'comics':
        return (
          <ComicsContentView navigator={this.props.navigator}/>
        );
      case 'events':
        return (
          <EventsContentView navigator={this.props.navigator}/>
        );
      case 'series':
        return (
          <SeriesContentView navigator={this.props.navigator}/>
        );
      case 'stories':
        return (
          <StoriesContentView navigator={this.props.navigator}/>
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
});

module.exports = connect(select, actions)(MarvelTabsView);
