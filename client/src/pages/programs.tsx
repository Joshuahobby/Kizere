import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Programs() {
  const programs = [
    {
      title: "Community Health Education",
      description: "Empowering communities with knowledge about preventive healthcare and wellness practices.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca"
    },
    {
      title: "Medical Outreach",
      description: "Bringing essential healthcare services directly to underserved communities.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
    },
    {
      title: "Healthcare Innovation",
      description: "Developing and implementing new approaches to healthcare delivery.",
      image: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283"
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Programs</h1>
          <p className="text-lg text-muted-foreground">
            Discover how we're making healthcare more accessible through our various initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Support Our Programs?</h2>
          <p className="mb-6 text-muted-foreground">
            Join us as a volunteer or partner to help expand our impact.
          </p>
          <Link href="/contact">
            <Button size="lg">Get Involved</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
