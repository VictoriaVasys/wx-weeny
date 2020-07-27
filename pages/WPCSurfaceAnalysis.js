import React, {useContext} from 'react';
import { Linking, Text, View } from 'react-native';
import { AppContext, styles } from "../App";
import WindyMap from "../components/WindyMap";
import { WINDY_KEY } from "../utils/APIKeys";

export default function WPCSurfaceAnalysis() {
  const data = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Surface Analysis</Text>
      <View style={styles.body}>
        <div style={{ height: '50%', marginBottom: 16, overflow: 'scroll'}}>
          <img
            alt="NWS Weather Prediction Center surface analysis"
            src="https://www.wpc.ncep.noaa.gov/sfc/namussfc15wbg.gif"
            style={{borderRadius: 4, width: '150%'}}
          />
          <Text style={styles.link} onPress={ ()=> Linking.openURL('https://www.wpc.ncep.noaa.gov/html/stationplot.shtml') } >Decode station plots</Text>
        </div>
        <div style={{textAlign: 'center'}}>
        </div>
        <WindyMap lat={data.lat} lon={data.lon} windyKey={WINDY_KEY} />
      </View>
    </View>
  );
}