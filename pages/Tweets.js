import React, { useEffect } from 'react';
import {Image, Text, View} from 'react-native';
import { styles } from '../App'

export default function Tweets() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NWS WPC tweets</Text>
      <section className="twitterContainer" style={{borderRadius: 16, overflow: 'scroll'}}>
        <div className="twitter-embed">
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-tweet-limit="5"
            data-chrome="noheader nofooter noborders"
            href="https://twitter.com/NWSWPC?ref_src=twsrc%5Etfw"
            style={{color: '#c1e9c0', fontFamily: 'Verdana', textDecoration: 'none'}}
          >
            <Text style={[styles.loading, { height: '100vh', marginTop: '-97px', paddingTop: '-109px' }]}><Image style={styles.loadingImage} source={require('../assets/wx-weeny-logo.png')} /></Text>
          </a>
        </div>
      </section>
    </View>
  );
}