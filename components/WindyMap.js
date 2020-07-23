import React, { Component } from "react";
import { Map, LayersControl, TileLayer, Marker, Popup } from "react-windy-leaflet";

const { BaseLayer, Overlay } = LayersControl;

export default class WindyMap extends Component {
  state = {
    lat: 39,
    lng: -104,
    zoom: 6,

    pickerOpen: true,
    pickerLat: 39,
    pickerLng: -104,

    overlay: "wind"
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map
        className="leaflet-container"
        windyKey={this.props.windyKey}
        windyLabels={true}
        windyControls={true}
        overlay={this.state.overlay}
        overlayOpacity={0.5}
        particlesAnim={false}
        zoom={this.state.zoom}
        center={[this.state.lat, this.state.lng]}
        removeWindyLayers
        onWindyMapReady={() => {
          console.log("Windy Map Loaded!");
        }}
        // pickerPosition={[this.state.pickerLat, this.state.pickerLng]}
        pickerPosition={
          this.state.pickerOpen
            ? [this.state.pickerLat, this.state.pickerLng]
            : null
        }
        onPickerOpened={latLng => console.log("Picker Opened", latLng)}
        onPickerMoved={latLng => {
          console.log("Picker Moved", latLng);
          this.setState({
            pickerLat: latLng.lat,
            pickerLng: latLng.lon
          });
        }}
        onPickerClosed={() => console.log("Picker Closed")}
        style={{flex: 2}}
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

// const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet
//
// class SimpleExample extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       lat: 51.505,
//       lng: -0.09,
//       zoom: 13
//     }
//   }
//
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <LeafletMap center={position} zoom={this.state.zoom}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br/> Easily customizable.
//           </Popup>
//         </Marker>
//       </LeafletMap>
//     );
//   }
// }
//
//
// ReactDOM.render(<SimpleExample />, document.getElementById('windy'))