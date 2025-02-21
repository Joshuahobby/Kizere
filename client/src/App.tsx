import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import Programs from "@/pages/programs";
import Impact from "@/pages/impact";
import Contact from "@/pages/contact";
import ThankYou from "@/pages/thank-you";
import Events from "@/pages/events";
import NotFound from "@/pages/not-found";
import AdminRoute from "@/components/auth/AdminRoute"; // Added import
import AdminDashboard from "@/pages/admin/dashboard"; // Added import

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/programs" component={Programs} />
          <Route path="/impact" component={Impact} />
          <Route path="/impact/:id" component={() => import("@/pages/impact/[id]")} />
          <Route path="/contact" component={Contact} />
          <Route path="/thank-you" component={ThankYou} />
          <Route path="/events" component={Events} />
          <Route path="/admin"> {/* Added admin route */}
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;