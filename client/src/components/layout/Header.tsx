import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Added imports, assuming these components exist in your project.  Adjust as needed.
import { useToast } from "@/hooks/useToast";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";


export default function Header() {
  const { toast } = useToast();
  const location = useLocation();
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <img src="/logo.png" alt="WholeHealth Logo" className="h-6" />
          <span className="font-bold">WholeHealth</span>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/programs">
                <NavigationMenuLink>Programs</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/impact">
                <NavigationMenuLink>Our Impact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/events">
                <NavigationMenuLink>Events</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">
                <NavigationMenuLink>Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isAdmin && (
              <NavigationMenuItem>
                <Link href="/admin">
                  <NavigationMenuLink>Admin</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
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