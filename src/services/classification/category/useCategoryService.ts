import {useMutation, useQuery} from "@tanstack/react-query";
import queryOptions from "@Src/services/classification/category/queries";
import {CategoryMainReq, CategorySort} from "@Src/services/classification/category/model";

export function useFindByCategories() {
  return useQuery(queryOptions.findAll());
}

export function useFindByCategory({ id }: { id: string }) {
  return useQuery(queryOptions.findOne(id));
}

export function useAddCategoryMain() {
  return useMutation(queryOptions.addMain());
}

export function useUpdateCategorySort() {
  return useMutation(queryOptions.updateSort());
}