import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import links from '../links.js'
import { styles } from "../App";
import './Learning.css'

export default function Learning() {
  const linksSize = Object.keys(links).length
  const getRandomLink = () => Object.keys(links)[Math.floor(Math.random() * linksSize)]

  const [fact, setFact] = useState(getRandomLink())

  const onGetNewFact = () => {
    setFact(getRandomLink())
  }

  return (
    <View style={[styles.container, {display: 'flex'}]}>
      <Text style={styles.title}>{fact.toLowerCase()}</Text>
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', overflow: 'hidden'}}>
        <div style={{marginBottom: 0, overflow: 'scroll'}}>
          <table style={{color: '#FFF', fontFamily: 'Courier New', marginBottom: 8}}><div dangerouslySetInnerHTML={{__html: links[fact]}} /></table>
        </div>
        <Button color="#404e8c" onPress={onGetNewFact} title="Get new fact" />
      </div>
    </View>
  );
}