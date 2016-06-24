/**
* @providesModule MarvelInfoView
* @flow
*/

'use strict';
var React = require('react');
var StyleSheet = require('StyleSheet');
var Text = require('Text');

class MarvelInfoView extends React.Component {
  render() {
    return (
      <Text style={styles.marvelinfo}>
      Data provided by Marvel. © 2016 Marvel.
      </Text>
    );
  }
}

var styles = StyleSheet.create({
  marvelinfo: {
    marginBottom: 24,
    fontSize: 12,
    color: '#032250',
    textAlign: 'center',
  },
});

module.exports = MarvelInfoView;
