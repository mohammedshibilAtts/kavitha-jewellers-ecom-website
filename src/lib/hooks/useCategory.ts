import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

export const useCategoriesList = () => {
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => categoryService.getAll(),
  });
};

export const useActiveCategories = () => {
  return useQuery({
    queryKey: ["categories", "active"],
    queryFn: () => categoryService.getAllActive(),
  });
};

export const useCategoryDetails = (id: string) => {
  return useQuery({
    queryKey: ["categories", "detail", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
};
