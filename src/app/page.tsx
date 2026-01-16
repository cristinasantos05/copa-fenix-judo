import { Settings } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-foreground">
      <h1 className="text-4xl font-bold mb-8">Welcome to Copa Fenix Judo</h1>
      <p>This is the home page of our Next.js application.</p>
      <Settings />
    </div>
  );
}
