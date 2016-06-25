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
var {connect} = require('react-redux');
var ListView = require('ListView');
var TouchableHighlight = require('TouchableHighlight');
var RecyclerViewBackedScrollView = require('RecyclerViewBackedScrollView');

import ActionButton from 'react-native-action-button';

const batman = require('../img/batmancolor.png');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class CharactersContentView extends React.Component {

  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeperator = this.renderSeperator.bind(this);
  }

  render() {
    if(this.props.characters && this.props.characters.length > 0) {
      ds = ds.cloneWithRows(this.props.characters);
    }
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'rgb(18, 134, 117)', height: 24}}
        />
        <ToolbarAndroid
          title='CHARACTERS'
          titleColor='white'
          navIcon={batman}
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
        <ListView
          style={{flex:1, width: undefined, height: undefined}}
          dataSource={ds}
          renderRow={this.renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeperator}
        />
        <ActionButton
          buttonColor="rgb(18, 134, 117)"
          onPress={() => { this.handleSearchIconClicked()}}
        />
      </View>
    );
  }

  renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
      return (
        <View
          style={{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
          }}
        />
      );
    }

  renderRow(rowData: Character, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
      return (
        <TouchableHighlight  onPress={() => {
            highlightRow(sectionID, rowID);
          }}>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri: rowData.thumbnail}} />
              <View style={{flexDirection: 'column'}} >
                <Text style={styles.title}>
                  {rowData.name}
                </Text>
                <Text style={styles.text}>
                  {rowData.description}
                </Text>
              </View>
            </View>
        </TouchableHighlight>
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
  },

  row: {
    paddingLeft: 10,
    height: 100,
    width: undefined,
    flexDirection: 'row',
  },

  thumb: {
    width: 100,
    height: 100,
    alignItems: 'center',
    resizeMode:Image.resizeMode.contain,
    marginRight: 10,
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight:'bold',
  },

  text: {
    fontSize: 16,
    flex: 1,
  }
});

function select(store) {
  return {
    characters: store.marvel.popularcharacters,
  };
}

module.exports = connect(select)(CharactersContentView);
