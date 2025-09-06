// app/journal/layout.tsx
import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader size={40} color="#9333ea" /> 
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
