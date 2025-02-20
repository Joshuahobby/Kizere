import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              WHOLEhealth Organization is dedicated to improving healthcare access
              and outcomes for communities worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/programs">Our Programs</Link></li>
              <li><Link href="/impact">Our Impact</Link></li>
              <li><Link href="/contact">Get Involved</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contact@wholehealth.org</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Health Street</li>
            </ul>
          </div>

          <div>
            <Newsletter />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          © 2024 WHOLEhealth Organization. All rights reserved.
        </div>
      </div>
    </footer>
  );
}