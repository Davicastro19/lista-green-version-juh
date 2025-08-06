"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/shared/interfaces/ISideBar";
import authStore from "@/shared/stores/authStore";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Home,
  PlusIcon,
  Search,
  Settings,
  Star
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ProfileCard from "../profile/profile-card";
import { ListButton } from "./list-button";
import PromotionItens from "./promotion-itens";

const menuItems: MenuItem[] = [
  { href: "/home", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Buscar" },
  { href: "/home/negocios", icon: BriefcaseBusiness, label: "Negócios" },
];


function BottomMenu() {
  const router = useRouter();
  const path = usePathname();
  const { user, signOut, fetchUser } = authStore;
  const [isExpanded, setIsExpanded] = useState(false);
  const listItems: { href: string; label: string }[] = [
    { href: `/home/negocios/curtidos/${user?._id}`, label: `Negócios Curtidos (${user?.likes.length || 0})` },
    { href: `/home/lista/salvas/${user?._id}  `, label: `Listas Salvas (${user?.saved.length || 0})` },
    { href: "/home/lista-promocoes", label: "Listas de Promoções" },
  ];

  return (
    <div className="fixed lg:hidden bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center p-2 border-t">
      <ProfileCard user={user || undefined} signOut={signOut} fetchUser={fetchUser} />
      {user && user.isMember &&
        <div className="hover:bg-gray-100  bg-[var(--basegreen)]/20 p-2 rounded-md" onClick={() => router.push('/home/member-field')}><Star className=" hover:text-[var(--darkgreen)] hover:bg-gray-50" /></div>}

      {menuItems.map((item) => {
        if (
          (user?.type !== "admin" && item.href.includes("gerenciar")) ||
          ((user?.type !== "admin" && user?.type !== "ofertante") && item.href.includes("negocios"))
        ) {
          return null;
        }
        return (
          <Button
            key={item.href}
            onClick={() => [setIsExpanded(false), router.push(item.href)]}
            variant="ghost"
            className={cn(
              "flex flex-col items-center text-gray-500",
              path.includes(item.href) ? "text-[var(--darkgreen)]" : "hover:text-green-400"
            )}
          >
            <item.icon className="size-6" />
          </Button>
        );
      })}

      {/* Botão para expandir mais opções */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="ghost"
        className="flex flex-col items-center text-gray-500 hover:text-green-400"
      >
        <PlusIcon className="size-6" />
      </Button>

      {/* Menu suspenso */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-14 w-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 z-30"
        >
          {(user?.type === 'admin') &&
            <Button
              key={'/home/gerenciar'}
              onClick={() => [setIsExpanded(false), router.push('/home/gerenciar')]}
              variant="ghost"
              className={cn(
                "flex flex-col items-center text-gray-500",
                path.includes('/home/gerenciar') ? "text-[var(--darkgreen)]" : "hover:text-green-400"
              )}
            >
              <Settings className="size-6" /> Gerenciar
            </Button>
          }
          <Button
            onClick={() => [setIsExpanded(false), router.push("/home/member-field")]}
            variant="ghost"
            className={cn(
              " cursor-pointer text-[var(--graygreen)] flex items-center justify-center w-full gap-2 px-2 py-4 bg-white rounded-xl shadow-md font-bold",
              path.includes("/home/member-field")
                ? "text-[var(--fulldarkgreen)]"
                : "hover:text-[var(--glowgreen)]"
            )}
          >
            Benefícios do membro
          </Button>
          {user ? (<>
            {listItems.map((item) =>
              (item.label === 'Listas de Promoções' && (user?.isMember || user?.type === 'admin') ||
                item.label !== 'Listas de Promoções') ? (
                <ListButton key={item.href} {...item} set={() => setIsExpanded(false)} name={item.label} />
              ) : null
            )}

            <PromotionItens set={() => setIsExpanded(false)} />
          </>) : (<div className="flex flex-col w-full gap-4">
            <text className="text-center">Para conseguir salvar listas, faça o login ou cadastre-se na Lista Green.</text>
            <motion.button
              className="cursor-pointer w-full py-2 lg:py-3 text-sm lg:text-md font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)] rounded-lg shadow-xl transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = "/login"}
            >
              Faça o login
            </motion.button>
            <motion.button
              className=" cursor-pointer w-full  py-2 lg:py-3  text-sm  lg:text-md font-medium text-[var(--darkgreenhome)] bg-gradient-to-r from-white to-[#c8ffea] rounded-lg shadow-xl transition-all hover:from-[#c8ffea] hover:via-[#defff2] hover:to-[#fff]"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = "/cadastro"}
            >
              Crie sua conta
            </motion.button>
          </div>)}

        </motion.div>
      )}
    </div>
  );
}

export default observer(BottomMenu);
