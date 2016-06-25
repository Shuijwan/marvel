/**
* @flow
*/

'use strict';

var React = require('react');
var StyleSheet = require('StyleSheet');
var View = require('View');
var ToolbarAndroid = require('ToolbarAndroid');


class CharacterDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'rgb(18, 134, 117)', height: 25}}
        />
        <ToolbarAndroid
          title={this.props.character.name}
          titleColor='white'
          navIcon={require("../img/back.png")}
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
      </View>
    );
  }

  handleIconClicked() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  toolbar: {
    height: 56,
    backgroundColor: 'rgb(18, 134, 117)',//green
    elevation: 2,
    borderRightWidth: 1,
    marginRight: -1,
    borderRightColor: 'transparent',
  },
});

module.exports = CharacterDetailView;
