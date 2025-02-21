
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Activity } from "@shared/schema";

export default function ImpactStory() {
  const { id } = useParams();
  const { data: activity } = useQuery<Activity>({
    queryKey: [`/api/activities/${id}`],
  });

  if (!activity) return <div>Loading...</div>;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          {activity.imageUrl && (
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          )}
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
            <p className="text-muted-foreground mb-4">
              {new Date(activity.date).toLocaleDateString()}
            </p>
            <div className="prose max-w-none">
              {activity.description}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
