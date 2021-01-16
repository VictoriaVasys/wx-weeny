import React, {useContext} from 'react';
import { Linking, Text, View } from 'react-native';
import { AppContext, styles } from '../MainContainer';
import WindyMap from "../components/WindyMap";

export default function WPCSurfaceAnalysis() {
  const data = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Surface Analysis</Text>
      <View style={styles.body}>
        <div style={{ borderRadius: 16, height: '50%', marginBottom: 16, overflow: 'auto'}}>
          <img
            alt="NWS Weather Prediction Center surface analysis"
            src="https://www.wpc.ncep.noaa.gov/sfc/namussfc15wbg.gif"
            style={{objectFit: 'none', width: '150%'}}
          />
          <Text style={styles.link} onPress={ ()=> Linking.openURL('https://www.wpc.ncep.noaa.gov/html/stationplot.shtml') } >Decode station plots</Text>
        </div>
        <div style={{textAlign: 'center'}}>
        </div>
        <WindyMap lat={data.lat} lon={data.lon} />
      </View>
    </View>
  );
}