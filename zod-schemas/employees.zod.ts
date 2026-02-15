import z from "zod";

export const employeesFormSchema = z.object({
  fuelTypeId: z.coerce
    .number<number>("Please select a type of fuel.")
    .nonnegative(),
  equipmentTypeId: z.coerce
    .number<number>("Please select a type of equipment.")
    .nonnegative(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(99, { message: "Name must be at most 99 characters" }),
  fuelCapacity: z.coerce.number<number>(),
  identifier: z.string().max(99).optional(),
  isFuelTruck: z.boolean(),
});
