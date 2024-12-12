import React from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SimpleSidebarProps {
  children: React.ReactNode;
}

export function SimpleSidebar({ children }: SimpleSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300",
          isOpen ? 'w-64' : 'w-16',
          "lg:translate-x-0",
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Desktop toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-[-12px] top-4 bg-background border rounded-full p-1 hover:bg-accent hidden lg:block"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden absolute right-[-40px] top-4 bg-background border rounded-md p-2 hover:bg-accent"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar content */}
        <div className={cn(
          "h-full",
          isOpen ? 'w-64' : 'w-16',
        )}>
          {children}
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        isOpen ? 'lg:ml-64' : 'lg:ml-16',
        "ml-0"
      )}>
        <div className="p-4">
          <slot />
        </div>
      </div>
    </div>
  );
}
