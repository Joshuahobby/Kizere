import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-primary">Thank You for Volunteering!</h1>
          
          <p className="text-lg mb-8 text-muted-foreground">
            Your commitment to joining WHOLEhealth Organization in our mission to assist Rwandans with mental health support is deeply appreciated. As a healthcare provider focusing on public health, counseling, theology, and leadership, your contribution will help us touch more lives physically, emotionally, and spiritually.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <p className="text-muted-foreground mb-4">
              Our team will review your application and contact you soon to discuss how your skills and interests align with our programs. Together, we'll work towards cultivating a healthy environment of love and wellbeing in our society.
            </p>
          </div>

          <div className="space-x-4">
            <Link href="/programs">
              <Button variant="outline">
                Explore Our Programs
              </Button>
            </Link>
            <Link href="/">
              <Button>
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
