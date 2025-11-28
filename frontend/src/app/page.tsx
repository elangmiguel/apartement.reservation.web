'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
