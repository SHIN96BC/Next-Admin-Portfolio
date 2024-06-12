import Service from "@Src/services/Service";
import {
  CategoriesRes,
  CategoryMainReq,
  CategoryRes,
  CategorySort,
} from "@Src/services/classification/category/model";

class CategoryService extends Service {
  getCategories() {
    return this.http.get<CategoriesRes[]>('/mall/categories');
  }

  getCategory(id: string) {
    return this.http.get<CategoryRes>(`/mall/categories/${id}`);
  }

  addCategoryMain(data: CategoryMainReq) {
    return this.http.post<CategoryMainReq, CategorySort>('/mall/categories', data);
  }

  updateCategorySort(data: CategorySort) {
    return this.http.put<CategorySort, null>('', data);
  }
}

const categoryService = new CategoryService();

export default categoryService;