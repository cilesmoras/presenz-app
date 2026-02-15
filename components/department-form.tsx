"use client";

import { createDepartment } from "@/app/actions/departments.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { indexPageRoutes } from "@/lib/constants";
import {
  Department,
  departmentsFormSchema,
  type DepartmentFormValues,
} from "@/zod-schemas/departments.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "./toast";

type DepartmentFormProps = {
  department?: Department;
  pathToRevalidate?: string;
};

export function DepartmentForm({
  department,
  pathToRevalidate,
}: DepartmentFormProps) {
  const isAddMode = !department;
  const router = useRouter();

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentsFormSchema),
    defaultValues: {
      name: department?.name ?? "",
    },
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    const result = isAddMode
      ? await createDepartment(data, pathToRevalidate)
      : null;
    // : await updateDepartment(data, department.id, pathToRevalidate);

    toast(result?.success ? "success" : "error", result?.message ?? "");
    if (!result?.success) return;

    if (isAddMode) form.reset();
    else router.push(indexPageRoutes.departments);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isAddMode ? "Create Department" : "Edit Department"}
        </CardTitle>
        <CardDescription>Please enter the name below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Department"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
