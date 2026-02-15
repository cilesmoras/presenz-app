import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { indexPageRoutes } from "@/lib/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function EmployeesPage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <PageHeading>Employees</PageHeading>
        <Link href={`${indexPageRoutes.employees}/create`}>
          <Button className="text-sm" size="sm" variant="outline">
            <Plus /> Create employee
          </Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <EmployeesTable data={employees} /> */}
      </Suspense>
    </>
  );
}
