import { useQuery } from "@tanstack/react-query";
import { schemeService } from "../services/scheme.service";

export const useSchemes = () => {
  return useQuery({
    queryKey: ["schemes", "all"],
    queryFn: () => schemeService.getAll(),
  });
};
