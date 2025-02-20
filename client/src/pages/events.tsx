import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@shared/schema";
import { format } from "date-fns";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const handleRegister = async (eventId: number) => {
    try {
      await apiRequest(`/api/events/${eventId}/register`, {
        method: 'POST'
      });
      toast({
        title: "Successfully registered!",
        description: "You have been registered for this event.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Unable to register for this event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getEventType = (type: string) => {
    switch (type) {
      case 'health_camp':
        return <Badge className="bg-green-500">Health Camp</Badge>;
      case 'workshop':
        return <Badge className="bg-blue-500">Workshop</Badge>;
      case 'community_program':
        return <Badge className="bg-purple-500">Community Program</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };

  const selectedDateEvents = events?.filter(event => {
    const eventDate = new Date(event.startDate);
    return selectedDate && 
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground">
            Join our health camps, workshops, and community programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <p>Loading events...</p>
                ) : selectedDateEvents && selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            {getEventType(event.eventType)}
                          </div>
                          <Button 
                            onClick={() => handleRegister(event.id)}
                            disabled={event.currentParticipants >= event.maxParticipants}
                          >
                            Register
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-2">{event.description}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Location: {event.location}</p>
                          <p>Time: {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</p>
                          <p>Spots available: {event.maxParticipants - event.currentParticipants} of {event.maxParticipants}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No events scheduled for this date</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
