import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";
import getLocation from "../../../hooks/getLocation";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, location, address, isLocationLoading, locationError ,isLoading , error } = getLocation("search")

  // if (isLocationLoading) return <ActivityIndicator size="large" color={COLORS.primary} />
  // if (locationError) return <Text>Something went wrong</Text>
  // if(address) return  <Text>{address[0].country}</Text>
  const isLocationReq= true
 
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React Native developer",
  //   num_pages: "1",
    
  // },isLocationReq );
  
  // console.log("location", location ,'address',address[0].city)
  // console.log(location);
  // console.log(address[0].city)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Developers Jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>

      {/* {isLocationLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : locationError ? (
        <Text>Something went wrong</Text>
      ) : (
        <Text>{(address) &&address[0].country}</Text>
      )} */}
    </View>
  );
};

export default Nearbyjobs;
