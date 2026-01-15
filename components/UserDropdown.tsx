"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({ user }: { user: User }) => {
  // const user = { name: "Tayyab", email: "tayyab@gmail.com" };
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger>Open</DropdownMenuTrigger> */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {" "}
          <div className="bg-orange-500 h-[35px] w-[35px] rounded-[50%] flex items-center justify-center">
            <span className="text-purple-700 font-bold text-xl">
              {user.name[0].toUpperCase()}
            </span>
          </div>
          {/* <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://jsmastery.com/_next/image?url=%2Fassets%2Fgeneral%2Fimages%2Fjsm-logo.webp&w=3840&q=75"
              alt="@shadcn"
            />
            <AvatarFallback className="bg-yellow-400 text-yellow-900 font-bold text-sm">
              {user.name[0]}
            </AvatarFallback>
          </Avatar> */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400">
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <div className="bg-orange-500 h-[35px] w-[35px] rounded-[50%] flex items-center justify-center">
              <span className="text-purple-700 font-bold text-xl">
                {user.name[0].toUpperCase()}
              </span>
            </div>
            {/* <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://jsmastery.com/_next/image?url=%2Fassets%2Fgeneral%2Fimages%2Fjsm-logo.webp&w=3840&q=75"
                alt="@shadcn"
              />
              <AvatarFallback className="bg-yellow-400 text-yellow-900 font-bold text-sm">
                {user.name[0]}
              </AvatarFallback>
            </Avatar> */}
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-500" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
        <nav className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
