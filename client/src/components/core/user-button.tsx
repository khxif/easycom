"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  MonitorSmartphoneIcon,
  MoonStarIcon,
  SunIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

export default function UserButton() {
  const { setTheme } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[22rem]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start space-y-1">
          <h6 className="font-semibold">Color Theme</h6>
          <div className="flex space-x-4">
            <Button
              onClick={() => handleThemeChange("light")}
              variant="outline"
              className="rounded-full w-full"
            >
              <SunIcon />
              Light
            </Button>
            <Button
              onClick={() => handleThemeChange("dark")}
              variant="outline"
              className="rounded-full w-full"
            >
              <MoonStarIcon />
              Dark
            </Button>
            <Button
              onClick={() => handleThemeChange("system")}
              variant="outline"
              className="rounded-full w-full"
            >
              <MonitorSmartphoneIcon />
              System
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="text-red-600 font-medium flex items-center justify-center w-full  hover:text-red-600"
          >
            <LogOutIcon />
            <p>Logout</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
