# Supabase Setup & Migration Guide

Follow these steps to connect your local StanchTech project to a real database.

## 1. Create a Supabase Project
1. Go to [Supabase.com](https://supabase.com/) and create a new project.
2. Once the project is created, find your **Project URL** and **Anon Key** in **Project Settings > API**.
3. Copy these into your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 2. Initialize Database Tables
Go to the **SQL Editor** in your Supabase dashboard and run the following script to create your tables:

```sql
-- Create Products Table
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  currency TEXT DEFAULT '₦',
  image TEXT,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  sku TEXT UNIQUE NOT NULL,
  category TEXT,
  condition TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Orders Table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Processing',
  total NUMERIC NOT NULL,
  payment_method TEXT,
  delivery_method TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  billing JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Enable Realtime for Orders
ALTER TABLE orders REPLICA IDENTITY FULL;
```

## 3. Next Steps
Once the tables are created:
1. We will update `src/app/admin/page.tsx` to use the `supabase` client.
2. We will migrate your existing "Local Storage" data into your new database using a one-time script.
3. We will connect your project to **Vercel** for public deployment.

> [!IMPORTANT]
> Make sure to fill in the `.env.local` values before we proceed with updating the code, otherwise the site will show connection warnings.
