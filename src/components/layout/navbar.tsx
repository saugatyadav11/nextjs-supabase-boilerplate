'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Next.js Supabase</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user && (
            <div className="flex items-center space-x-1">
              <Button 
                asChild 
                variant={isActive('/dashboard') ? "default" : "ghost"}
                className="text-sm"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                asChild 
                variant={isActive('/profile') ? "default" : "ghost"}
                className="text-sm"
              >
                <Link href="/profile">Profile</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
