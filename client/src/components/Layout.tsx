import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, MailCheck } from "lucide-react";
import { SimpleSidebar } from "./SimpleSidebar";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Profiles', href: '/profiles', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: MailCheck },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <SimpleSidebar>
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b">
        <h1 className="text-xl font-semibold">Recovery Platform</h1>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {children}
    </SimpleSidebar>
  );
}
