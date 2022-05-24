import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import { Image, Pressable, Text, Center, Square, Circle, Box, VStack, HStack, Heading, FlatList, Avatar, Spacer, Spinner } from "native-base"
import { getItemFromUrl, getLocation } from '../services/CharactersService';

import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen({ route, navigation }) {
  var item = route.params.selectedItem;
  const [listEpisodeName, setListEpisodeName] = useState([]);
  const [location, setLocation] = useState();
  const [origin, setOrigin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    try {
      let isMounted = true;
      let [resNames, resLocations, resOrigins] = await Promise.all([loadNames(), loadLocations(), loadOrigins()]);
      if (isMounted) {
        setListEpisodeName(resNames)
        setLocation(resLocations);
        setOrigin(resOrigins);
        setIsLoading(false);
      }

      return () => { isMounted = false };
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }, []);

  async function loadNames() {
    console.log("loadName called")
    let tmpList = []
    await Promise.all(item.episode.map(async (elem) => {
      try {
        let res = await getItemFromUrl(elem);
        if (res != null)
          tmpList.push(res.name)
      } catch (error) {
        console.log('error' + error);
      }
    }))
    console.log('complete all') // gets loged first
    return tmpList;
  }
  async function loadLocations() {
    console.log("load location called")
    if (item.location.url == "") return null;
    return await getItemFromUrl(item.location.url);
  }
  async function loadOrigins() {
    if (item.location.url == "") return null;
    return await getItemFromUrl(item.origin.url);
  }

  return (
    <Box flex={1}>
      <Heading fontSize="2xl" pt="5" alignSelf={'center'}>
        {item.name}
      </Heading>
      <Heading fontSize="md" pb="3" bgColor={"gray.500"} alignSelf={'center'}>
        {item.species}
      </Heading>
      <Image
        alignSelf={'center'}
        alt="alt"
        size={"200"}
        source={{
          uri: item.image
        }} />
      {isLoading ? <HStack space={2} justifyContent="center" mt={30}>
        <Spinner accessibilityLabel="Loading" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack> : <VStack >

        <Text pl={5} pt={2} color={'black'}>Origin: {item.origin.name} dimension: {origin?.dimension} residents: {origin?.residents?.length}</Text>
        <Text pl={5} pt={2}> Location: {item.location.name} dimension: {location?.dimension} residents: {location?.residents?.length}</Text>
        <Text fontSize={'lg'} color='black' ml={20} mt={2}>List of episodes</Text>
        <FlatList
          marginBottom={10}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}
          data={listEpisodeName}
          keyExtractor={item => item}
          renderItem={({
            item
          }) => <Text>{item}</Text>
          }
        />
      </VStack>}
    </Box>
  );
}
