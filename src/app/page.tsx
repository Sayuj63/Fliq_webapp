import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import HomePage from "@/app/homepage/page"; // Import your new HomePage component

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Welcome! Please sign in to continue.</h1>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        <HomePage />
      </SignedIn>
    </>
  );
}
