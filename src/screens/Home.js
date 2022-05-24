import React, { useState, useEffect } from 'react';
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, Center, Square, Circle, Box, VStack, HStack, Heading, FlatList, Avatar, Spacer } from "native-base"
import { getListCharacters } from '../services/CharactersService';

export default function Home({ navigation: { navigate } }) {

  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [listCharacters, setListCharacters] = useState([]);
  useEffect(async () => {
    var res = await getListCharacters();
    if (res != null) {
      if (res.info != null) {
        setNextPageUrl(res.info.next);
        setPrevPageUrl(res.info.prev);
      }
    }
    if (res.results != null) {
      setListCharacters(res.results);
    }
  });

  const renderItemList = (item) => {
    var statusColor = item.status == "Alive" ? "green.600" : item.status == "Dead" ? 'red.600' : "gray.600";
    return (
      <Pressable onPress={() => navigate("DetailScreen", { selectedItem: item })}>
        <Box
          borderBottomWidth="1"
          borderColor="coolGray.200"
          pl="4" pr="5" py="2">
          <HStack space={3} justifyContent="space-between">
            <Avatar size="55px"
              source={{
                uri: item.image
              }} />
            <VStack width={"40%"}>
              <Text numberOfLines={1} fontSize="lg" color="coolGray.800" bold>
                {item.name}
              </Text>
              <Text  numberOfLines={1} fontSize="sm" color="coolGray.500" bold>
                {item.species} - {item.gender}
              </Text>
            </VStack>
            <Spacer />
            <HStack >
              <Box marginTop={1} marginRight={1} height={3} width={3} borderRadius={6} backgroundColor={statusColor} />
              <Text color="coolGray.600">
                {item.status} -
              </Text>
              <Text color="coolGray.600">
                {item.species}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    );
  }
  return (
    <Box flex={1}>
      <Heading fontSize="xl" p="4" pb="3">
        Characters
      </Heading>
      <FlatList
        contentContainerStyle={{ paddingBottom: 2 }}
        data={listCharacters}
        renderItem={(item) => renderItemList(item.item)}
        keyExtractor={item => item.id} />
    </Box>
  );
}
