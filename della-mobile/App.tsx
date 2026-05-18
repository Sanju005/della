import { SafeAreaProvider } from "react-native-safe-area-context";

import { PrototypeApp } from "./src/PrototypeApp";

export default function App() {
  return (
    <SafeAreaProvider>
      <PrototypeApp />
    </SafeAreaProvider>
  );
}
