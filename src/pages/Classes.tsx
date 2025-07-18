import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Clock, 
  Users,
  Edit,
  Trash2,
  MoreHorizontal,
  BookOpen,
  Calendar,
  MapPin
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock class data that would come from Spring Boot API
const mockClasses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    subject: "Mathematics",
    instructor: "Dr. Smith",
    schedule: "Mon, Wed, Fri - 09:00 AM",
    duration: "90 mins",
    capacity: 20,
    enrolled: 15,
    fee: 450,
    status: "active",
    room: "Room A-101",
    description: "Advanced calculus and analytical geometry for 12th grade students."
  },
  {
    id: 2,
    name: "Physics Lab",
    subject: "Physics", 
    instructor: "Prof. Johnson",
    schedule: "Tue, Thu - 11:30 AM",
    duration: "120 mins",
    capacity: 15,
    enrolled: 12,
    fee: 500,
    status: "active",
    room: "Lab B-205",
    description: "Hands-on physics experiments and practical applications."
  },
  {
    id: 3,
    name: "Chemistry Theory",
    subject: "Chemistry",
    instructor: "Dr. Brown",
    schedule: "Mon, Wed - 02:00 PM", 
    duration: "90 mins",
    capacity: 18,
    enrolled: 18,
    fee: 400,
    status: "full",
    room: "Room C-301",
    description: "Comprehensive chemistry theory covering organic and inorganic chemistry."
  },
  {
    id: 4,
    name: "Biology Practical",
    subject: "Biology",
    instructor: "Ms. Wilson",
    schedule: "Fri - 04:30 PM",
    duration: "120 mins", 
    capacity: 16,
    enrolled: 8,
    fee: 350,
    status: "active",
    room: "Lab D-102",
    description: "Biology lab sessions with microscopy and dissection practicals."
  }
];

export default function Classes() {
  const [classes, setClasses] = useState(mockClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || classItem.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, enrolled: number, capacity: number) => {
    if (status === "full" || enrolled === capacity) {
      return <Badge className="bg-warning text-warning-foreground">Full</Badge>;
    }
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUtilizationColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return "text-warning";
    if (percentage >= 70) return "text-success";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground">Manage class schedules and enrollments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Create a new class with schedule and enrollment details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="className" className="text-right">Class Name</Label>
                <Input id="className" placeholder="e.g., Advanced Mathematics" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructor" className="text-right">Instructor</Label>
                <Input id="instructor" placeholder="Instructor name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">Schedule</Label>
                <Input id="schedule" placeholder="e.g., Mon, Wed - 09:00 AM" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">Capacity</Label>
                <Input id="capacity" type="number" placeholder="20" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fee" className="text-right">Fee</Label>
                <Input id="fee" type="number" placeholder="450" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">Room</Label>
                <Input id="room" placeholder="Room A-101" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" placeholder="Class description..." className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>{classItem.subject}</CardDescription>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {getStatusBadge(classItem.status, classItem.enrolled, classItem.capacity)}
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  Instructor: {classItem.instructor}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {classItem.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Duration: {classItem.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {classItem.room}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enrollment</p>
                  <p className={`text-sm ${getUtilizationColor(classItem.enrolled, classItem.capacity)}`}>
                    {classItem.enrolled}/{classItem.capacity} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Fee</p>
                  <p className="text-sm text-muted-foreground">${classItem.fee}/month</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {classItem.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No classes found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search criteria" : "Add your first class to get started"}
          </p>
        </div>
      )}
    </div>
  );
}