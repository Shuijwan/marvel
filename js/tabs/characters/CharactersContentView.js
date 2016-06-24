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
import ActionButton from 'react-native-action-button';

const batman = require('../img/batmancolor.png');

class CharactersContentView extends React.Component {

  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title='CHARACTERS'
          titleColor='white'
          navIcon={batman}
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        <ActionButton
          buttonColor="rgb(18, 134, 117)"
          onPress={() => { this.handleSearchIconClicked()}}
        />
      </View>
    );
  }

  handleIconClicked() {
    this.context.openDrawer();
  }

  handleSearchIconClicked() {

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

  searchbox: {
    height: 56,
    width: 290,
    alignSelf: 'center',
    fontSize: 15,
  }
});

module.exports = CharactersContentView;
