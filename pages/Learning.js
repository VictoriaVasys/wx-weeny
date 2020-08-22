import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import links from '../links.js'
import { styles } from "../App";
// import '../pages/Learning.css'

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
          <table style={{color: '#C1E9C0', fontFamily: 'Courier New', marginBottom: 8}}><div dangerouslySetInnerHTML={{__html: links[fact]}} /></table>
        </div>
        <button onClick={onGetNewFact} style={learningStyles.button}>
          <Text style={learningStyles.buttonText}>Get new fact</Text>
        </button>
      </div>
    </View>
  );
}

const learningStyles = {
  button: {
    backgroundColor: '#C1E9C0',
    border: 'none',
    borderRadius: 16,
    marginTop: 16,
    padding: 8,
  },
  buttonText: {
    backgroundColor: '#C1E9C0',
    color: '#232323',
    fontFamily: 'Courier New',
    fontSize: 16,
    fontWeight: 'bold',
  }
}