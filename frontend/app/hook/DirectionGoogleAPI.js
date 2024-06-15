// GoogleApiServices.js
import { GOOGLE_MAPS_APIKEY } from "@env";
import { decodePolyline } from "../utils/utils";

//console.log({GOOGLE_MAPS_APIKEY})
export const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
    const apiKey = GOOGLE_MAPS_APIKEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log({data})
      console.log({response})
      
      if (data.status !== "OK") {
        throw new Error(data.error_message || "Failed to fetch directions");
      }
      
      const encodedPolyline = data.routes[0].overview_polyline.points;
      console.log({encodedPolyline})
      const coordinates = decodePolyline(encodedPolyline);
      console.log({coordinates}) //Restaurant Coordinates
      
      return coordinates;
    } catch (error) {
      console.error("Failed to fetch directions:", error);
      throw error;
    }
  };