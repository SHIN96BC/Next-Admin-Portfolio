import {DISCOUNT_PROMOTION_TYPE_DATE_VALUE, DISCOUNT_PROMOTION_TYPE_LONG_VALUE} from "@Src/constants/product/add";

export interface SetDiscount {
  discount: string,
  promotionType: typeof DISCOUNT_PROMOTION_TYPE_LONG_VALUE | typeof DISCOUNT_PROMOTION_TYPE_DATE_VALUE,
  promotionStartDate?: string,
  promotionEndDate?: string,
}