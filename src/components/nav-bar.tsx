import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import Notifications from "./notifications";

const tabs = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="sticky top-2 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-auto md:h-16 px-4 md:px-8 flex md:flex-row w-full gap-4 justify-between items-center bg-green-50 backdrop-blur-lg rounded-lg shadow-md p-3">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <img
            src="/image.png"
            alt="Logo"
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <p className="text-lg font-bold md:text-2xl">Urja Setu</p>
        </div>

        <div className="hidden md:flex items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto md:h-14 items-stretch  p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-all w-full md:w-36 shadow-md bg-white/30",
                    "focus-visible:ring-2 focus-visible:ring-opacity-50",
                    "data-[state=active]:text-white",
                    "data-[state=active]:shadow-none"
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-white/30 bg-opacity-20 rounded-full border border-white/30 border-opacity-30 shadow-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-20 mix-blend-difference">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-4 md:w-auto">
          <ShoppingCart fill="black" className="w-6 h-6 md:w-8 md:h-8" />
          <Notifications />
          {/* <div className="flex justify-center items-center gap-2">
            {" "}
            <Avatar>
              {" "}
              <AvatarImage src="profile.jpg" />{" "}
              <AvatarFallback>Vardaan</AvatarFallback>{" "}
            </Avatar>{" "}
            <p className="font-semibold text-xl">Vardaan</p>{" "}
          </div> */}
          <Button className="hidden md:flex font-bold px-4 md:px-8 py-2 md:py-5 text-md md:w-auto">
            Login
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-white/30 shadow-lg"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-green-50">
              <SheetHeader>
                <SheetTitle className="flex">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </Button>
                ))}
                <Button className="mt-4">Login</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
