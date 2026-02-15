# Database Setup with Drizzle ORM and Supabase

## Setup Instructions

### 1. Get Your Supabase Connection String

1. Go to your [Supabase project dashboard](https://app.supabase.com)
2. Navigate to **Project Settings** > **Database**
3. Copy the **Connection String** (use the "Transaction" pooler mode for best compatibility)
4. Replace `[YOUR-PASSWORD]` with your database password

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Update `DATABASE_URL` in `.env.local` with your Supabase connection string

### 3. Define Your Schema

Edit `db/schema.ts` to define your database tables using Drizzle ORM syntax.

Example:

```typescript
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### 4. Push Schema to Database

Run one of these commands to sync your schema:

```bash
# Push schema directly to database (good for development)
npm run db:push

# OR generate migrations (recommended for production)
npm run db:generate
npm run db:migrate
```

### 5. Use the Database in Your App

Import the `db` instance anywhere in your Next.js app:

```typescript
import { db } from "@/db";
import { users } from "@/db/schema";

// Query example
const allUsers = await db.select().from(users);

// Insert example
await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
});
```

## Available Commands

- `npm run db:generate` - Generate migration files from schema
- `npm run db:migrate` - Run migrations on the database
- `npm run db:push` - Push schema changes directly (dev mode)
- `npm run db:studio` - Open Drizzle Studio (visual database browser)

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Drizzle with Supabase Guide](https://orm.drizzle.team/docs/get-started-postgresql#supabase)
- [Supabase Documentation](https://supabase.com/docs)
