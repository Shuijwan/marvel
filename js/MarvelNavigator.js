/**
* @flow
*/

'use strict';

var React = require('react');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');
var { connect } = require('react-redux');
var MarvelTabsView = require('MarvelTabsView');
var CharacterDetailView = require('./tabs/characters/CharacterDetailView');
var SearchView = require('./tabs/characters/SearchView');
var Platform = require('Platform');

var self;

class MarvelNavigator extends React.Component {

  _backHandlers: Array<() => boolean>;

  constructor(props) {
    super(props);
    this._backHandlers = [];
    self = this;
  }

  componentDidMount() {
    if(Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackPressed);
    }
  }

  componentWillUnmount() {
    if(Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPressed);
    }
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
    self._backHandlers.push(listener);
  }

  removeBackButtonListener(listener) {
    self._backHandlers = self._backHandlers.filter((handler) => handler !== listener);
  }

  handleBackPressed() {
    for(let i=self._backHandlers.length-1; i>=0; i--) {
      if(self._backHandlers[i]()) {
        return true;
      }
    }

    var navigator = self.refs.navigator;
    if(navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if(route.character) {
            return Navigator.SceneConfigs.PushFromRight;
          }
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }

          return Navigator.SceneConfigs.FloatFromBottom;

        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />

    );
  }

  renderScene(route, navigator) {
    if(route.character) {
      return (
        <CharacterDetailView navigator={navigator} character={route.character}/>
      );
    }

    if(route.search) {
      return (
        <SearchView navigator={navigator}/>
      );
    }

    return (
      <MarvelTabsView navigator={navigator}/>
    );
  }
}

MarvelNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(MarvelNavigator);
