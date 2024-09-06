import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClent = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClent}>
      <AppNavigation />
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
