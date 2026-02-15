"use server";
import { db } from "@/db";
import { departments } from "@/db/schema";
import { TServerActionResponse } from "@/lib/definitions";
import {
  DepartmentFormValues,
  departmentsFormSchema,
} from "@/zod-schemas/departments.zod";
import { isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { validateAuth } from "./auth";

export async function getDepartments() {
  try {
    await validateAuth();
    const result = await db
      .select({
        id: departments.id,
        name: departments.name,
        createdAt: departments.createdAt,
        createdBy: departments.createdBy,
      })
      .from(departments)
      .where(isNull(departments.deletedAt));
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createDepartment(
  data: DepartmentFormValues,
  pathToRevalidate?: string,
): Promise<TServerActionResponse> {
  try {
    const auth = await validateAuth();
    const parsed = departmentsFormSchema.safeParse(data);
    if (!parsed.success)
      return { success: false, message: "Failed to save. Invalid form data." };

    const newData = { ...data, createdBy: auth.id };
    const result = await db.insert(departments).values(newData).returning();
    if (pathToRevalidate) revalidatePath(pathToRevalidate);

    return {
      success: true,
      message: "Department has been saved.",
      data: result[0].id,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error." };
  }
}
