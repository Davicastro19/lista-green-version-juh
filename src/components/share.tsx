import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { copyLink, shareOnFacebook, shareOnTelegram, shareOnWhatsApp } from "@/shared/functions/cardsFunctions";
import { Share2 } from "lucide-react";
import { FaFacebook, FaLink, FaTelegram, FaWhatsapp } from "react-icons/fa";

interface SharedProps {
    name: string
}

export default function Shared({ name }: SharedProps) {


  return (
    <DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button variant="outline" size="icon" className="cursor-pointer bg-white hover:scale-110 border-0 shadow-md">
    <Share2  className={cn("w-5 h-5 size-6 ", false ? "text-green-600 fill-green-600" : "text-black")} />
  </Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end" className="bg-white shadow-md rounded-md text-black">
  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => shareOnWhatsApp(name)}>
    <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp
  </DropdownMenuItem>
  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => shareOnTelegram(name)}>
    <FaTelegram className="mr-2 text-blue-500" /> Telegram
  </DropdownMenuItem>
  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => shareOnFacebook(name)}>
    <FaFacebook className="mr-2 text-blue-600" /> Facebook
  </DropdownMenuItem>
  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => copyLink(name)}>
    <FaLink className="mr-2 text-gray-500" /> Copy Link
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
  );
}
