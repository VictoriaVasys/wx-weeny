import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home'
import Learning from './pages/Learning'
import WPCSurfaceAnalysis from './pages/WPCSurfaceAnalysis'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Learning" component={Learning} />
        <Tab.Screen name="Surface Analysis" component={WPCSurfaceAnalysis} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}