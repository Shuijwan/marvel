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
var {connect} = require('react-redux');
var ListView = require('ListView');
var RecyclerViewBackedScrollView = require('RecyclerViewBackedScrollView');
var {windowWidth} = require('constant');

var {searchCharacterByName, clearSearchResult} = require('../../actions');

import TimerMixin from 'react-timer-mixin';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var timerId = 0;

class SearchView extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackPressed = this.handleBackPressed.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clearSearchResult());
  }

  render() {
    if(this.props.result && this.props.result.length > 0) {
      ds = ds.cloneWithRows(this.props.result);
    } else {
      ds = ds.cloneWithRows([]);
    }

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
        <ListView
          style={{flex:1, width: undefined, height: undefined}}
          dataSource={ds}
          renderRow={this.renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          enableEmptySections
        />
      </View>
    );
  }

  handleCharacterClicked(selectedItem: Character) {
    this.props.navigator.push({ character: selectedItem });
  }

  renderRow(rowData: Character, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
      return (
        <TouchableHighlight  underlayColor='rgba(255,255,255, 0.2)' style={{backgroundColor:'rgb(244,245,246)'}} onPress={() => {
            highlightRow(sectionID, rowID);
            this.handleCharacterClicked(rowData);
          }}>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri: rowData.thumbnail}} />
              <View style={{flexDirection: 'column'}} >
                <Text style={styles.title}>
                  {rowData.name}
                </Text>
                <Text numberOfLines={2} style={styles.text}>
                  {rowData.description}
                </Text>
              </View>
            </View>
        </TouchableHighlight>
      );
  }

  handleBackPressed() {
    this.props.navigator.pop();
  }

  onChangeText(text: string) {
      TimerMixin.clearTimeout(timerId);
      timerId = TimerMixin.setTimeout(() => {this.searchCharacter(text)}, 1000);
  }

  searchCharacter(name: string) {
    global.LOG('search', name);
    if(name.length > 0) {
      this.props.dispatch(searchCharacterByName(name));
    } else {
      this.props.dispatch(clearSearchResult());
    }
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
    marginLeft: 20,
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 100,
    width: undefined,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 1,
    elevation: 2,
  },

  thumb: {
    width: 80,
    height: undefined,
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
    paddingRight: 5,
    width: windowWidth-130,//TODO, how to let Text autofit the view width?
  }
});

function select(store) {
  return {
    result: store.marvel.searchResult,
  };
}

module.exports = connect(select)(SearchView);
