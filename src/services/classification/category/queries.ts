import CategoryService from "@Src/services/classification/category/CategoryService";
import {CategoryMainReq, CategorySort} from "@Src/services/classification/category/model";

const queryKeys = {
  findAll: ['categories'] as const,
  findOne: (id: string) => [...queryKeys.findAll, id] as const,
  uploadUrl: ['uploadUrl'] as const,
};

const queryOptions = {
  findAll: () => ({
    queryKey: queryKeys.findAll,
    queryFn: () => CategoryService.getCategories(),
  }),
  findOne: (id: string) => ({
    queryKey: queryKeys.findOne(id),
    queryFn: () => CategoryService.getCategory(id),
  }),
  addMain: () => ({
    mutationFn: (data: CategoryMainReq) => CategoryService.addCategoryMain(data),
  }),
  updateSort: () => ({
    mutationFn: (data: CategorySort) => CategoryService.updateCategorySort(data),
  }),
};

export default queryOptions;