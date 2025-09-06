// components/CheckUser.tsx
'use client';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Guest from './Guest';

export default function CheckUser({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><Guest /></SignedOut>
    </>
  );
}
