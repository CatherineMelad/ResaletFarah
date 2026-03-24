"use client";

import { ReduxProvider } from "./components/redux.provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}