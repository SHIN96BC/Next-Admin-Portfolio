import {z} from "zod";

export const categorySchema = z.object({
  nameEn: z.string().min(1, 'category.errors.nameEn'),
  nameKo: z.string().min(1, 'category.errors.nameKo'),
  availability: z.string(),
  ageVerification: z.string(),
  // files: z.instanceof(File),
  files: z.any(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export type CategorySchemaKeys = keyof typeof categorySchema.shape;