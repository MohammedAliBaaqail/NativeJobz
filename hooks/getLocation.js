import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const getLocation = (endpoint, query) => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  


  useEffect(() => {
    const getPermissions = async () => {
      setIsLocationLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        
        // Run reverseGeocode after obtaining location
        reverseGeocode(currentLocation);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissions();
  }, []);

  const reverseGeocode = async (currentLocation) => {
    try {
      let reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
      setAddress(reverseGeocodedAddress);
      
      fetchData(reverseGeocodedAddress)
    } catch (error) {
      setLocationError(error)
      console.log(error);
    }
    finally {
      setIsLocationLoading(false);
    }
  };

  const fetchData = async (reverseGeocodedAddress) => {
    console.log(reverseGeocodedAddress)
    const options = {
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        'X-RapidAPI-Key': '79fcf9b435msh33e8a3282b5820dp1d61afjsnec61bab9e776',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      params: {query: `developer in ${reverseGeocodedAddress[0].city},${reverseGeocodedAddress[0].country} `,
      num_pages: "1" } 
      
  
    };
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    data,
    location,
    address,
    isLocationLoading,
    locationError,
    
    isLoading ,
     error
  };
};

export default getLocation;