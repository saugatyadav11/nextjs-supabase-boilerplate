'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">User Information</h3>
              <p className="text-sm text-gray-500">Email: {user?.email}</p>
              <p className="text-sm text-gray-500">User ID: {user?.id}</p>
              {user?.user_metadata?.username && (
                <p className="text-sm text-gray-500">Username: {user.user_metadata.username}</p>
              )}
            </div>
            
            <div className="pt-4 flex flex-wrap gap-2">
              <Button asChild variant="default">
                <Link href="/profile">Manage Profile</Link>
              </Button>
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
