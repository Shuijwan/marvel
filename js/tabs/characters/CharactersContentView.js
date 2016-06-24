/**
* @flow
*/
'use strict';

var React = require('React');
var Text = require('Text');
var View = require('View');
var ToolbarAndroid = require('ToolbarAndroid');
var StyleSheet = require('StyleSheet');
var TextInput = require('TextInput');
var Image = require('Image');
const batman = require('../img/batman_color.png');

class CharactersContentView extends React.Component {

  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          navIcon={batman}
          title='CHARACTERS'
          titleColor='white'
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
        <View style={{flex:1}}/>
        <View style={{flexDirection:'row', alignSelf:'center'}}>
          <Image
            source={require('../img/batman_color.png')}
            style={{width:35, height:35, alignItems:'center', marginRight: 8, marginTop:6}}
          />
          <TextInput
            placeholder='Search the character here'
            multiline= {false}
            onChangeText={this.onSearchCharacterChanged}
            style={styles.searchbox}
          />
        </View>
        <View style={{flex:2}}/>
      </View>
    );
  }

  handleIconClicked() {
    this.context.openDrawer();
  }
}

CharactersContentView.contextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 24,
    flexDirection: 'column',
    backgroundColor: 'transparent',//green
  },
  toolbar: {
    height: 56,
    backgroundColor: 'rgb(18, 134, 117)',//green
    elevation: 2,
    borderRightWidth: 1,
    marginRight: -1,
    borderRightColor: 'transparent',
  },

  searchbox: {
    height: 56,
    width: 290,
    alignSelf: 'center',
    fontSize: 15,
  }
});

module.exports = CharactersContentView;
