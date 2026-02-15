import z from "zod";

export const departmentsFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" }),
});

export type DepartmentFormValues = z.infer<typeof departmentsFormSchema>;

export const departmentsSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Department = z.infer<typeof departmentsSelectSchema>;
