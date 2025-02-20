import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { News, Partner, Activity } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { data: news } = useQuery<News[]>({ 
    queryKey: ["/api/news"]
  });

  const { data: partners } = useQuery<Partner[]>({ 
    queryKey: ["/api/partners"]
  });

  const { data: activities } = useQuery<Activity[]>({ 
    queryKey: ["/api/activities"]
  });

  const heroSlides = [
    {
      title: "Transforming Healthcare",
      description: "Join us in our mission to provide accessible, quality healthcare to communities worldwide.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      cta: { text: "Get Involved", link: "/contact" }
    },
    {
      title: "Mental Health Support",
      description: "Dedicated to assisting Rwandans with various mental health issues through community outreach.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      cta: { text: "Our Programs", link: "/programs" }
    },
    {
      title: "Community Impact",
      description: "Making a difference through media talk shows, in-person gatherings, and healthcare initiatives.",
      image: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90",
      cta: { text: "See Our Impact", link: "/impact" }
    }
  ];

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-black/30">
                    <div className="container mx-auto px-4 h-full flex items-center">
                      <div className="max-w-2xl text-white">
                        <motion.h1 
                          className="text-4xl md:text-6xl font-bold mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {slide.title}
                        </motion.h1>
                        <motion.p 
                          className="text-xl mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {slide.description}
                        </motion.p>
                        <Link href={slide.cta.link}>
                          <Button size="lg" className="bg-[#fc7025] hover:bg-[#e65b15]">
                            {slide.cta.text}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#24676f]">Who We Are</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    WHOLEhealth is dedicated to assisting Rwandans with various mental health issues,
                    reaching thousands through community outreach, media talk shows, and in-person gatherings.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To cultivate a healthy environment of love and physical/mental/social/spiritual
                    wellbeing in our society through collective efforts and comprehensive care.
                  </p>
                </div>
                <Link href="/about">
                  <Button className="bg-[#24676f] hover:bg-[#1c4f56]">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Healthcare professional"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities/Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#24676f]">Our Recent Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities?.slice(0, 3).map((activity) => (
              <Link key={activity.id} href={`/impact/${activity.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {activity.imageUrl && (
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-[#24676f]">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{activity.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/impact">
              <Button className="bg-[#fc7025] hover:bg-[#e65b15]">
                View All Impact Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#24676f]">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners?.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-16 w-auto mx-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}