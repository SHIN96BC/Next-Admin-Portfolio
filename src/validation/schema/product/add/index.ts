import {z} from "zod";

export const enterOptionSchema = z.object({
  name: z.string().min(1, 'productAdd.optionSetting.option.enterOption.error.name'),
  value: z.string().min(1, 'productAdd.optionSetting.option.enterOption.error.value')
});

export const enterOptionListSchema = z.object({
  list: z.array(enterOptionSchema),
});

export type EnterOptionListData = z.infer<typeof enterOptionListSchema>;