import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex w-full max-w-5xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Next.js Supabase Boilerplate</h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            A minimal setup with Next.js, Supabase, ShadCN, and React Query
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Next.js App Router"
            description="Modern, server-first framework with React Server Components"
            icon="🚀"
          />
          <FeatureCard
            title="Supabase Integration"
            description="Easy authentication and database operations with Supabase"
            icon="📊"
          />
          <FeatureCard
            title="ShadCN UI"
            description="Beautiful, accessible UI components built with Radix and Tailwind"
            icon="🎨"
          />
          <FeatureCard
            title="React Query"
            description="Powerful data synchronization for React applications"
            icon="⚡"
          />
          <FeatureCard
            title="Tailwind CSS v4"
            description="Utility-first CSS framework for rapid UI development"
            icon="🌈"
          />
          <FeatureCard
            title="TypeScript"
            description="Type safety and improved developer experience"
            icon="🔧"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://github.com/saugat-rimal/nextjs-supabase-boilerplate" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>
          Built with Next.js, Supabase, and ShadCN UI. Open source and ready for your next project.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 text-3xl">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
