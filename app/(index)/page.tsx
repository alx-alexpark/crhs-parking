import Image from 'next/image';
import Link from 'next/link';

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function IndexPage() {
  return (
    <main>
      <nav></nav>
      <h1>Lorem ipsum</h1>

      <UserButton></UserButton>
      {/* <SignedIn> */}
      {/*   <UserButton></UserButton> */}
      {/* </SignedIn> */}
      {/* <SignedOut> */}
      {/*   <RedirectToSignIn /> */}
      {/* </SignedOut> */}

      <Link href="/parking-request">goto</Link>
    </main>
  );
}
