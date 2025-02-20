import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { News, Partner, Activity } from "@shared/schema";

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-[#24676f] text-white">
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
              <Button size="lg" className="bg-[#fc7025] hover:bg-[#e65b15]">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#24676f]">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news?.slice(0, 3).map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-[#24676f]">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="py-16 bg-gray-50">
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
      <section className="py-16">
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