import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertNewsletterSchema, type InsertNewsletter } from "@shared/schema";

export default function Newsletter() {
  const { toast } = useToast();
  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
      name: null // Explicitly set to null for optional field
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      try {
        await apiRequest("POST", "/api/newsletter/subscribe", data);
      } catch (error: any) {
        // Extract the error message from the response if available
        const message = error.response?.data?.message || error.message;
        throw new Error(message);
      }
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter."
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="w-full max-w-md">
      <h3 className="font-semibold text-lg mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Stay updated with our latest news, programs, and community initiatives.
      </p>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit((data) => {
            // Ensure we're sending valid data
            const payload = {
              email: data.email,
              name: data.name || null // Convert empty string to null
            };
            mutation.mutate(payload);
          })} 
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Your name (optional)" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value || null)} // Convert empty string to null
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-[#fc7025] hover:bg-[#e65b15]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    </div>
  );
}