import { useRootLayoutStore } from "@/stores/root-layout-store";
import { useQuery } from "@tanstack/react-query";

export function useInitApp() {
  const { initApp } = useRootLayoutStore();

  useQuery({
    queryKey: ["initApp"],
    queryFn: initApp,
  });
}
