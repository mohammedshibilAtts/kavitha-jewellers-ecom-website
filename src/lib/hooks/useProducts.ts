import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export const useProductsList = () => {
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: () => productService.getAll(),
  });
};

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => productService.getByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useProductsBySubcategory = (subcategoryId: string) => {
  return useQuery({
    queryKey: ["products", "subcategory", subcategoryId],
    queryFn: () => productService.getBySubcategory(subcategoryId),
    enabled: !!subcategoryId,
  });
};

export const useSearchProducts = (query: any) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => productService.search(query),
    enabled: !!query,
  });
};
