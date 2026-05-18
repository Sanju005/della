import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { CustomerFlow } from "./screens/CustomerFlow";
import { EntryScreen } from "./screens/EntryScreen";
import { ProviderFlow } from "./screens/ProviderFlow";
import { SplashScreen } from "./screens/SplashScreen";

type RootStage = "splash" | "entry" | "customer" | "provider";
type CustomerStartMode = "login" | "register";

export function PrototypeApp() {
  const [stage, setStage] = useState<RootStage>("splash");
  const [customerStartMode, setCustomerStartMode] =
    useState<CustomerStartMode>("login");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("entry");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      {stage === "splash" ? <SplashScreen /> : null}
      {stage === "entry" ? (
        <EntryScreen
          onLoginPress={() => {
            setCustomerStartMode("login");
            setStage("customer");
          }}
          onSignupPress={() => {
            setCustomerStartMode("register");
            setStage("customer");
          }}
          onProviderPress={() => setStage("provider")}
        />
      ) : null}
      {stage === "customer" ? (
        <CustomerFlow
          initialRoute={customerStartMode}
          onExit={() => setStage("entry")}
        />
      ) : null}
      {stage === "provider" ? <ProviderFlow onExit={() => setStage("entry")} /> : null}
    </>
  );
}
