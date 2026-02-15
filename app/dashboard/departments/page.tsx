import { getDepartments } from "@/app/actions/departments.action";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { indexPageRoutes } from "@/lib/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DepartmentsTable } from "./departments-table";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <PageHeading>Departments</PageHeading>
        <Link href={`${indexPageRoutes.departments}/create`}>
          <Button className="text-sm" size="sm" variant="outline">
            <Plus /> Create department
          </Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DepartmentsTable data={departments} />
      </Suspense>
    </>
  );
}
