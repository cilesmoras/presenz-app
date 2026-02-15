"use client";

import { DataTable } from "@/components/ui/data-table";
import { Department, departmentColumns } from "./columns";

interface DepartmentsTableProps {
  data: Department[];
}

export function DepartmentsTable({ data }: DepartmentsTableProps) {
  return (
    <DataTable
      columns={departmentColumns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search departments..."
    />
  );
}
