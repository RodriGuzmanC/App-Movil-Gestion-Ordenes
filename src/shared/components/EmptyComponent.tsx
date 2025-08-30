import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";

export const EmptyComponent = ({ message = "No hay elementos disponibles" }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Icon source="emoticon-sad-outline" size={50} color="#777" />
      <Text variant="titleMedium" style={{ color: "#777", marginTop: 10 }}>
        {message}
      </Text>
    </View>
  );
};

