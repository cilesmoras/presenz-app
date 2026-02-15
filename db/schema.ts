import {
  boolean,
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Enums
export const employeeStatusEnum = pgEnum("employee_status", [
  "active",
  "inactive",
  "on_leave",
  "terminated",
]);

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "half_day",
  "on_leave",
]);

export const leaveTypeEnum = pgEnum("leave_type", [
  "sick",
  "vacation",
  "personal",
  "emergency",
  "unpaid",
]);

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
]);

export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// Users table (for authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Departments table
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  managerId: integer("manager_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Employees table
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  employeeCode: varchar("employee_code", { length: 50 }).notNull().unique(),
  departmentId: integer("department_id").references(() => departments.id),
  position: varchar("position", { length: 100 }),
  hireDate: date("hire_date").notNull(),
  status: employeeStatusEnum("status").default("active").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Shifts table
export const shifts = pgTable("shifts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  gracePeriodMinutes: integer("grace_period_minutes").default(15).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Employee Shifts Assignment
export const employeeShifts = pgTable("employee_shifts", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  shiftId: integer("shift_id")
    .notNull()
    .references(() => shifts.id, { onDelete: "cascade" }),
  dayOfWeek: dayOfWeekEnum("day_of_week"), // null means all days
  effectiveFrom: date("effective_from").notNull(),
  effectiveUntil: date("effective_until"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Attendance Records
export const attendanceRecords = pgTable("attendance_records", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  shiftId: integer("shift_id").references(() => shifts.id),
  date: date("date").notNull(),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  status: attendanceStatusEnum("status").notNull(),
  isTardy: boolean("is_tardy").default(false).notNull(),
  tardyMinutes: integer("tardy_minutes").default(0),
  workHours: decimal("work_hours", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Overtime Records
export const overtimeRecords = pgTable("overtime_records", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  attendanceRecordId: integer("attendance_record_id").references(
    () => attendanceRecords.id,
  ),
  date: date("date").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  hours: decimal("hours", { precision: 5, scale: 2 }).notNull(),
  reason: text("reason"),
  status: approvalStatusEnum("status").default("pending").notNull(),
  approvedBy: integer("approved_by").references(() => employees.id),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leave Requests (Absences)
export const leaveRequests = pgTable("leave_requests", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  leaveType: leaveTypeEnum("leave_type").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  reason: text("reason"),
  status: approvalStatusEnum("status").default("pending").notNull(),
  approvedBy: integer("approved_by").references(() => employees.id),
  approvedAt: timestamp("approved_at"),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Company Holidays
export const holidays = pgTable("holidays", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  date: date("date").notNull().unique(),
  description: text("description"),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
