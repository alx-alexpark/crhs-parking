import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <nav>
        <span>
          <Link href="/">
            <strong>CRHS Parking</strong>
          </Link>
        </span>
        <div className="nav-links">
          <UserButton />
        </div>
      </nav>
      {children}
    </main>
  );
}
