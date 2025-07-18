import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Clock,
  DollarSign,
  UserCheck
} from "lucide-react";

// Mock data that would come from Spring Boot API
const dashboardStats = {
  totalStudents: 156,
  activeClasses: 12,
  todayAttendance: 89,
  monthlyRevenue: 15750,
  studentGrowth: 12.5,
  classUtilization: 78
};

const recentActivities = [
  { id: 1, type: "enrollment", student: "Alice Johnson", class: "Advanced Math", time: "2 hours ago" },
  { id: 2, type: "payment", student: "Bob Smith", amount: 450, time: "3 hours ago" },
  { id: 3, type: "attendance", student: "Carol Davis", class: "Physics", time: "4 hours ago" },
  { id: 4, type: "class", title: "Chemistry Lab scheduled", time: "5 hours ago" }
];

const upcomingClasses = [
  { id: 1, title: "Advanced Mathematics", time: "09:00 AM", students: 15, instructor: "Dr. Smith" },
  { id: 2, title: "Physics Lab", time: "11:30 AM", students: 12, instructor: "Prof. Johnson" },
  { id: 3, title: "Chemistry Theory", time: "02:00 PM", students: 18, instructor: "Dr. Brown" },
  { id: 4, title: "Biology Practical", time: "04:30 PM", students: 14, instructor: "Ms. Wilson" }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your coaching center.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.totalStudents}</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{dashboardStats.studentGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.activeClasses}</div>
            <div className="text-xs text-muted-foreground">
              {dashboardStats.classUtilization}% utilization rate
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.todayAttendance}%</div>
            <Progress value={dashboardStats.todayAttendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-success">
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activities
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    {activity.type === "enrollment" && `${activity.student} enrolled in ${activity.class}`}
                    {activity.type === "payment" && `${activity.student} paid $${activity.amount}`}
                    {activity.type === "attendance" && `${activity.student} attended ${activity.class}`}
                    {activity.type === "class" && activity.title}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
                <Badge variant={
                  activity.type === "enrollment" ? "default" :
                  activity.type === "payment" ? "secondary" :
                  activity.type === "attendance" ? "outline" : "secondary"
                }>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Schedule
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{classItem.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Instructor: {classItem.instructor}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {classItem.time}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {classItem.students} students
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}