import Image from 'next/image';

import { SignIn, UserButton } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <main>
      <SignIn redirectUrl={'/'} afterSignInUrl={'/'} />
    </main>
  );
}
