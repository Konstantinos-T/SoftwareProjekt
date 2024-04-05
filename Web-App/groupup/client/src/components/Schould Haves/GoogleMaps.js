import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from '@material-ui/icons/Room';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class GoogleMaps extends Component {
  constructor(props) {
    super(props);

   this.componentDidMount=this.componentDidMount.bind(this);
   const AnyReactComponent = ({ text }) => <div>{text}</div>;
    this.state = {
      MarkerLatLongs:this.props.MarkerLatLongs,
      Markers:undefined,
      isMobile:undefined,
   //   containerDiv:undefined
  };
 // }
   /* static defaultProps = {
      center: {
        lat: 48.74,
        lng: 9.32,
      },
      zoom: 11,
      */
    };


componentDidMount(){
  console.log("Maps: MarkerLatLongs:"+JSON.stringify(this.state.MarkerLatLongs));
 // if(window.innerWidth>window.innerHeight){
 //   this.setState({isMobile:true})
 // }

if(this.state.MarkerLatLongs&&this.state.MarkerLatLongs>0){
const generatedMarkers = this.state.MarkerLatLongs.map((Data, i) => {
  console.log("MarkerLat"+JSON.stringify(Data.lat))
  /* console.log("Das sind die Daten die an die GebuchteFahrtCards weitergegeben werden" + Data.fahrtObjektID); */
    return (
      <AnyReactComponent
      key={i}
      lat={Data.lat}
      lng={Data.lng}
      text="Mein Eigener"></AnyReactComponent>
    );
}, this);
this.setState({Markers: generatedMarkers});

}

}; 

  render() {
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: "60vh", width: "80vw", margin: "auto" }}>
       
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAal9X3BtUcBUTaSCWtSTHUaXFkrrjMDHk" }}
          defaultCenter={{lat: 48.74, lng:9.32}}
          defaultZoom={11}
        >
          {this.state.Markers}
          </GoogleMapReact>
      </div>
    );
  }
}
    
export default GoogleMaps;
