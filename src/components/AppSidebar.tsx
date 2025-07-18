import { useState } from "react";
import { 
  Home, 
  Users, 
  Calendar, 
  UserCheck, 
  TrendingUp, 
  CreditCard, 
  Settings,
  BookOpen,
  Target
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Students", url: "/students", icon: Users },
  { title: "Classes", url: "/classes", icon: BookOpen },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Attendance", url: "/attendance", icon: UserCheck },
  { title: "Progress", url: "/progress", icon: Target },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
      active 
        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
        : "text-muted-foreground hover:text-accent-foreground"
    }`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                      end={item.url === "/"}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}