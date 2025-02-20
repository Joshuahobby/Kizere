import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const impactData = [
  { year: "2019", patients: 10000 },
  { year: "2020", patients: 25000 },
  { year: "2021", patients: 35000 },
  { year: "2022", patients: 42000 },
  { year: "2023", patients: 50000 },
];

export default function Impact() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Impact</h1>
          <p className="text-lg text-muted-foreground">
            See how we're making a difference in communities worldwide.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-4xl font-bold text-primary mb-2">50,000+</h3>
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

        {/* Growth Chart */}
        <Card className="mb-16">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Patients Served Growth</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f"
                alt="Community impact"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Community Education Success</h3>
              <p className="text-muted-foreground">
                Our health education programs have reached over 100,000 people, leading to improved
                health outcomes in partner communities.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1591197172062-c718f82aba20"
                alt="Medical outreach"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Medical Outreach Impact</h3>
              <p className="text-muted-foreground">
                Through our mobile clinics, we've provided essential healthcare services to
                remote communities, serving thousands of patients annually.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
