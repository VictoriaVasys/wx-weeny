import React, { Component } from "react";
import { Map, LayersControl, TileLayer, Marker, Popup } from "react-windy-leaflet";
import './WindyMap.css'

const { BaseLayer, Overlay } = LayersControl;

export default class WindyMap extends Component {
  state = {
    pickerOpen: true,
  };

  render() {
    const {lat, lon} = this.props
    const position = [lat, lon]

    return (
      <Map
        className="leaflet-container"
        windyKey={this.props.windyKey}
        windyLabels={true}
        windyControls={true}
        overlay="wind"
        overlayOpacity={0.9}
        particlesAnim={true}
        zoom={7}
        center={position}
        // removeWindyLayers
        onWindyMapReady={() => {
          console.log("Windy Map Loaded!");
        }}
        pickerPosition={null}
        // }
        // pickerPosition={
        //   this.state.pickerOpen
        //     ? position
        //     : null
        // onPickerOpened={latLng => {
        //   this.setState({pickerOpen: true})
        // }}
        // onPickerMoved={latLng => {
        //   console.log("Picker Moved", latLng);
        //   // this.setState({
        //   //   pickerLat: latLng.lat,
        //   //   pickerLon: latLng.lon
        //   // });
        // }}
        // onPickerClosed={() => {
        //   this.setState({pickerOpen: false})
        // }}
        style={{borderRadius: 4, flex: 2}}
        mapElements={
          <React.Fragment>
            <LayersControl>
              <BaseLayer checked name="OSM">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
            </LayersControl>

            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </React.Fragment>
        }
      />
    );
  }
}