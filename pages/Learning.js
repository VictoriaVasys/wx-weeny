import React, {Fragment} from 'react';
import { StyleSheet, Text } from 'react-native';
import links from '../links.js'

export default function Learning() {
  const linksSize = Object.keys(links).length
  const randomLink = Object.keys(links)[Math.floor(Math.random(linksSize) * 10)]
  return (
    <Fragment>
      <Text>{randomLink}</Text>
      <Text><div dangerouslySetInnerHTML={{__html: links[randomLink]}} /></Text>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});