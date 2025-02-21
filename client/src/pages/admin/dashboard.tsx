
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Activity, News } from "@shared/schema";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    impact: "",
    imageUrl: ""
  });
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    imageUrl: ""
  });

  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["/api/activities"]
  });

  const { data: news } = useQuery<News[]>({
    queryKey: ["/api/news"]
  });

  const createActivity = useMutation({
    mutationFn: (activity: Omit<Activity, "id" | "date">) =>
      fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      setNewActivity({ title: "", description: "", impact: "", imageUrl: "" });
    },
  });

  const createNews = useMutation({
    mutationFn: (news: Omit<News, "id" | "publishedAt">) =>
      fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      setNewNews({ title: "", content: "", imageUrl: "" });
    },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="activities">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="news">News & Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                createActivity.mutate(newActivity);
              }} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newActivity.title}
                  onChange={e => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Description"
                  value={newActivity.description}
                  onChange={e => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="Impact"
                  value={newActivity.impact}
                  onChange={e => setNewActivity(prev => ({ ...prev, impact: e.target.value }))}
                />
                <Input
                  placeholder="Image URL"
                  value={newActivity.imageUrl}
                  onChange={e => setNewActivity(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
                <Button type="submit">Add Activity</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {activities?.map(activity => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="news">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add News Update</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                createNews.mutate(newNews);
              }} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newNews.title}
                  onChange={e => setNewNews(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Content"
                  value={newNews.content}
                  onChange={e => setNewNews(prev => ({ ...prev, content: e.target.value }))}
                />
                <Input
                  placeholder="Image URL"
                  value={newNews.imageUrl}
                  onChange={e => setNewNews(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
                <Button type="submit">Add News</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {news?.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
