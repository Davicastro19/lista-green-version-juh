import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/shared/interfaces/IUser";
import { motion } from "framer-motion";
import { LogOut, Settings, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalCompleteUser from "../modals/modal-complete-user";

function ProfileCard({ user, signOut, fetchUser }: { user: IUser | undefined; signOut: () => void; fetchUser: () => void }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function SignOut() {
    try {
      signOut();
    } catch (w) {
      console.log(w);
    }
    router.push("/");
  }

  function goToProfile() {
    router.push("/home/perfil");
  }

  return (
    <div className="relative flex flex-row justify-center items-center cursor-pointer px-2 gap-2 w-10 lg:w-full sm:mb-4">
      <div
        className="flex flex-row justify-center items-center hover:bg-gray-50  rounded-md w-10 lg:w-full"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {user && !user.firstName && <ModalCompleteUser fetchUser={fetchUser} />}

        <Avatar className="w-8 h-8 lg:w-12 lg:h-12">
          <AvatarImage
            src={user?.image || "/images/menu/logo-lista-dark.svg"}
            alt="user"
            className="border-3 border-[var(--darkgreen)] rounded-full"
          />
        </Avatar>
        <div className="hidden lg:block ml-4  flex-1 " >
          <p className=" text-lg font-semibold capitalize truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[190px]  leading-5">
            {user ? `${user?.firstName || 'Bem-vindo!'} ${user?.lastName || ''}` : "Visitante"}
          </p>






          <p className="text-xs text-[var(--darkgreen)]  truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[190px]  font-bold uppercase  leading-3 ">
            {user && `${user?.type}`}
          </p>


        </div>

      </div>
      {user && user.isMember &&
        <div className="hover:bg-gray-100 hidden lg:block bg-[var(--basegreen)]/20 p-2 rounded-md" onClick={() => router.push('/home/member-field')}><Star className=" hover:text-[var(--darkgreen)] hover:bg-gray-50" /></div>}

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute bottom-20 lg:top-10  h-auto   lg:h-[90px] left-0 bg-white shadow-lg rounded-lg w-48 p-2 z-100`}
        >
          <p className="text-lg block lg:hidden font-semibold capitalize text-center">{user ? `${user.firstName || "Bem-vindo!"} ${user.lastName || ""}` : "Visitante"}</p>
          <p className="text-xs  block lg:hidden text-[var(--darkgreen)] text-center font-bold uppercase">{user && user.type}</p>
          <hr className="my-2  block lg:hidden" />
          <button onClick={goToProfile} className="flex items-center w-full p-2 hover:bg-gray-100">
            <Settings className="mr-2" size={16} /> Configuração
          </button>
          <button onClick={SignOut} className="flex items-center w-full p-2 hover:bg-gray-100 text-red-500">
            <LogOut className="mr-2" size={16} /> Sair
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ProfileCard;
