
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Button variant="ghost" className="p-0">
              <img src="/logo.png" alt="Logo" className="h-8" />
            </Button>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/volunteer">
              <Button variant="ghost">Volunteer</Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
