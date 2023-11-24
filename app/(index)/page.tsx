import { Heading, Highlight } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function IndexPage() {
  return (
    <main>
      <nav></nav>
      <h1>CRHS Parking</h1>
      <UserButton></UserButton>
    </main>
  );
}
