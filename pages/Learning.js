import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import links from '../links.js'
import { styles } from "../App";

const Table = styled.table`
  color: #e6f6e6;
  font-family: 'Verdana';
  font-size: 16px;
  margin-bottom: 8px;

  a {
    color: #89d587;
  }

  b {
    font-weight: normal;
  }
`

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
          <Table><div dangerouslySetInnerHTML={{__html: links[fact]}} /></Table>
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