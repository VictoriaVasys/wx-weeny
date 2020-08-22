import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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
          >
            NWS WPC tweets
          </a>
        </div>
      </section>
    </View>
  );
}