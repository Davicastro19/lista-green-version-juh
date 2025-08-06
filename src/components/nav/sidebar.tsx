  "use client";

  import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuButtonProps, MenuItem } from "@/shared/interfaces/ISideBar";
import authStore from "@/shared/stores/authStore";
import {
  BriefcaseBusiness,
  Home,
  List,
  PlusIcon,
  Search,
  Settings
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "../loadin";

  import { motion } from "framer-motion";
import { mutate } from "swr";
import DialogCreateList from "../modals/modal-create-list";
import ProfileCard from "../profile/profile-card";
import { ListButton } from "./list-button";
import PromotionItens from "./promotion-itens";
  const menuItems: MenuItem[] = [
    { href: "/home", icon: Home, label: "Início" },
    { href: "/busca", icon: Search, label: "Buscar" },
    { href: "/home/negocios", icon: BriefcaseBusiness, label: "Negócios" },
    { href: "/home/gerenciar", icon: Settings, label: "Gerenciar" },
  ];



  function MenuButton({ href, icon: Icon, label }: MenuButtonProps) {
    const path = usePathname();
    const router = useRouter();


    return (
      <>

      <Button
        onClick={() => router.push(href)}
        variant="ghost"
        className={cn(
          "cursor-pointer text-[var(--graygreen)] flex items-center justify-start w-full",
          path.includes(href)
            ? "text-[var(--fulldarkgreen)]"
            : "hover:text-[var(--glowgreen)]"
        )}
      >
        <Icon className="mr-3 size-6" />
        {label}
      </Button>
      </>
    );
  }

  function Sidebar() {
    const router = useRouter();
    const { user, isLoading , signOut,fetchUser} = authStore;
    const path = usePathname();
    const [openCreateList, setOpenCreateList] = useState(false)
    const listItems: { href: string; label: string }[] = [
      { href: `/home/negocios/curtidos/${user?._id}`,  label: `Negócios Curtidos (${user?.likes.length||0})` },
      { href: `/home/lista/salvas/${user?._id}  `, label: `Listas Salvas (${user?.saved.length|| 0})` },
      { href: "/home/lista-promocoes", label: "Listas de Promoções" },
    ];

    return (
      <aside className=" w-[15%] hidden lg:flex flex-col p-[10px] gap-4 h-[100vh]">
        {openCreateList && <DialogCreateList mutate={()=> mutate('/lists/getListsByUser')} isOpen={true}  onClose={() => setOpenCreateList(false)} />}
        {isLoading ? (
          <nav className="flex flex-col gap-2 px-2 py-4 items-start bg-white rounded-xl shadow-md">
            <LoadingSpinner />
          </nav>
        ) : (
          <>
            {/* Profile Section */}
            <nav className="flex flex-col gap-2 px-2 py-4 items-start bg-white rounded-xl shadow-md">
              <ProfileCard user={user|| undefined} signOut={signOut} fetchUser={fetchUser}  />


              {menuItems.map((item) =>{
              if (user?.type !== 'admin' && item.href.includes("gerenciar") || (user?.type !== 'admin' && user?.type !== 'ofertante') && item.href.includes("negocios") ){
            return(<></>)

              }
              return   (
                <MenuButton key={item.href} {...item} />
              )
              })}
            </nav>


            <Button
              onClick={() => router.push("/home/member-field")}
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


            {/* Lists Section */}
            <nav className="flex flex-col gap-4 px-4 pt-4 items-start bg-white rounded-xl shadow-md h-screen">
              <div className="flex flex-row justify-between items-center w-full mb-0">
                <div className="flex flex-row items-center">
                  <List className="size-7" />
                  <span className="font-semibold ml-2 text-lg">Listas</span>
                </div>


                {user?.type === 'admin' &&
                <Button
                  onClick={() => setOpenCreateList(true)}
                  variant="ghost"
                  className="cursor-pointer bg-[var(--darkgreen)] h-7 flex items-center justify-center text-white rounded-lg shadow-md font-bold"
                >
                  <PlusIcon className="size-6" />
                </Button>}


              </div>
              {user ? (<>
                      {listItems.map((item) =>
                (item.label === 'Listas de Promoções' && (user?.isMember || user?.type === 'admin') ||
                item.label !== 'Listas de Promoções') ? (
                  <ListButton set={()=> {}} key={item.href} {...item} name={item.label} />
                ) : null
              )}

              <PromotionItens set={()=> {}} />
              </>):( <div className="flex flex-col w-full gap-4">
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
            </nav>
          </>
        )}
      </aside>
    );
  }

  export default observer(Sidebar);
