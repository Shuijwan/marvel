/**
* @flow
*/

'use strict';
var React = require('react');
var Text = require('Text');
var View = require('View');
var ToolbarAndroid = require('ToolbarAndroid');
var StyleSheet = require('StyleSheet');
var TextInput = require('TextInput');
var Image = require('Image');
var TouchableHighlight = require('TouchableHighlight');

class SearchView extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackPressed = this.handleBackPressed.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column',}}>
        <View style={{backgroundColor:'rgb(18, 134, 117)', height: 25}}
        />
        <View style={styles.toolbar}>
          <TouchableHighlight underlayColor='transparent' onPress={this.handleBackPressed}>
            <Image style={styles.back} source={require('../img/back.png')} />
          </TouchableHighlight>
          <TextInput
            placeholder="Search the hero"
            style={styles.search}
            onChangeText={this.onChangeText}
            />
        </View>
      </View>
    );
  }

  handleBackPressed() {
    this.props.navigator.pop();
  }

  onChangeText(text: string) {
    
  }
}

var styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: 'rgb(18, 134, 117)',//red
    elevation: 2,
    borderRightWidth: 1,
    marginRight: -1,
    borderRightColor: 'transparent',
    flexDirection: 'row',
  },

  back: {
      alignItems: 'center',
      margin: 20,
  },

  search: {
    height: 50,
    width: 250,
    alignSelf: 'center',
    color: 'white',
  }
});

module.exports = SearchView;
