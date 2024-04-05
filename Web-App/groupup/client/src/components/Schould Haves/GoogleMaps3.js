/* import {React, useState, useEffect} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import RoomIcon from '@material-ui/icons/Room';
import SuchenFahrtCardMini from '../Cards Raw/SuchenFahrtCardMini.js'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


function Map(props) {
  const [selectedFahrt, setSelectedFahrt]= useState(null);
  const [windowContent, setWindowContent]= useState(null);
//console.log("Von Karte:"+JSON.stringify(props.MarkerLatLongs));


 
if(props.driveData){
return(

   <GoogleMap defaultZoom={13} defaultCenter={{lat:48.7380323, lng:9.3110526}}>
   
  {props.driveData.map((Data,i)=>(
    <Marker
    key={i}
    position={{
      lat: Data.fahrtAbfahrtsLat,
      lng: Data.fahrtAbfahrtsLong
    }}
   onClick={() =>{
     setSelectedFahrt(Data);


   }}
    />
  ))}
  
  
  { selectedFahrt&& (

    <InfoWindow
    options={{minWidth:"300px"}}
    position={{
      lat: selectedFahrt.fahrtAbfahrtsLat,
      lng: selectedFahrt.fahrtAbfahrtsLong
    }}
    onCloseClick={() =>{
      setSelectedFahrt(null);
    }}
    >
      <SuchenFahrtCardMini driveData={selectedFahrt}></SuchenFahrtCardMini>
    </InfoWindow>
  



  )}
  </GoogleMap>
 
);
}
}


  


const WrappedMap= withScriptjs(withGoogleMap(Map));

export default function Maps(props) {
  
  //console.log("Von oberer Karte:" +JSON.stringify(props.Markerpos));
  return (
    <div>
    <BrowserView>
    <div style={{width: "70vw", height: "50vh", marginTop:"1em"}}>
      <WrappedMap  key={182573682769156} googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAal9X3BtUcBUTaSCWtSTHUaXFkrrjMDHk"}
      loadingElement={<div style={{height:"100%"}} />}
      containerElement={<div style={{height:"100%"}} />}
      mapElement={<div style={{height:"100%"}} />}
      MarkerLatLongs={props.Markerpos}
      driveData={props.driveData}
      />
   </div>
   </BrowserView>

<MobileView>
<div style={{width: "100vw", height: "60vh", marginTop:"1em"}}>
  <WrappedMap  key={9325609656409216} googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAal9X3BtUcBUTaSCWtSTHUaXFkrrjMDHk"}
  loadingElement={<div style={{height:"100%"}} />}
  containerElement={<div style={{height:"100%"}} />}
  mapElement={<div style={{height:"100%"}} />}
  MarkerLatLongs={props.Markerpos}
  driveData={props.driveData}
  />
</div>
</MobileView>
</div>
  )
} */