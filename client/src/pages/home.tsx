import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transforming Healthcare for Everyone
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join us in our mission to provide accessible, quality healthcare to communities worldwide.
            </motion.p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1516841273335-e39b37888115"
                alt="Healthcare professional"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                WHOLEhealth Organization is committed to breaking down barriers to healthcare access
                and promoting wellness in underserved communities through innovative programs and
                partnerships.
              </p>
              <Link href="/programs">
                <Button>Learn More About Our Programs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-4xl font-bold text-primary mb-2">50K+</h3>
                <p className="text-muted-foreground">Patients Served</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
                <p className="text-muted-foreground">Community Programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-4xl font-bold text-primary mb-2">25</h3>
                <p className="text-muted-foreground">Countries Reached</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
