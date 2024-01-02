import { WeatherProvider } from "@/contexts/WeatherContext";
import { useCachedResources } from "@/hooks/useCachedResources";
import { Navigator } from "@/navigations";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <WeatherProvider>
      <Navigator />
    </WeatherProvider>
  );
}
