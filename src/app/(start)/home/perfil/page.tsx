"use client";

import ModalEditUser from "@/components/modals/modal-edit-user";
import ResetPasswordModal from "@/components/modals/modal-user-update";
import httpService from "@/shared/api/fetcher";
import authStore from "@/shared/stores/authStore";
import { observer } from "mobx-react";
import { useState } from "react";

function AccountSettings() {
  const { user,fetchUser,signOut } = authStore;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isYesOrNoModalOpen, setYesOrNoModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openYesOrNoModal = (type: string) => {
    setModalType(type);
    setYesOrNoModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full py-4 pb-20">
      {/* Email Button */}


      {/* Form Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white md:bg-green-100/20 p-6 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold text-[var(--darkgreenhome)]">Editar dados</h3>
        {user && (
        <ModalEditUser user={user} fetchUser={fetchUser}  onClose={() =>setModalOpen(false)} />
        )}
        {/* Botão Trocar Senha */}

      </div>

      {/* Configuração de Conta */}
      <details className="w-full max-w-lg bg-green-100 p-2 mt-6 rounded-lg shadow">

        <summary className="cursor-pointer text-[var(--darkgreenhome)] font-semibold text-center">
          Configuração de conta
        </summary>
        <div className="grid grid-cols-1 gap-4 mt-4 text-center">

<button
    className="cursor-pointer  mt-0 w-full bg-[var(--darkgreenhome)]  text-white py-2 rounded hover:bg-[var(--darkgreen)] hover:shadow-lg"
    onClick={() => setModalOpen(true)}
  >
    Trocar senha de acesso
  </button>



          <button
            className="cursor-pointer w-full py-2 bg-red-600 text-white hover:bg-red-700"
            onClick={() => openYesOrNoModal("account")}
          >
            Solicitar exclusão da conta
          </button>
        </div>
      </details>
      <div className=" mt-6 cursor-pointer p-2 w-full max-w-lg text-center bg-green-100 hover:bg-green-200  rounded-lg shadow">
        <button
          className=" cursor-pointer w-full py-0 text--[var(--darkgreenhome)] hover:text-green-800"
          onClick={() => (window.location.href = "mailto:support@example.com")}
        >
          📧 Enviar Email
        </button>
      </div>
      {/* Logout */}
      <button className="cursor-pointer mt-6 max-w-lg w-full  bg-red-600  hover:bg-red-700 text-white py-2 rounded-lg  shadow">
        Sair
      </button>

      {/* Modal Senha */}
      {isModalOpen &&
        <ResetPasswordModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
}

{isYesOrNoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg text-center">
            <h2 className="font-bold text-lg">
              {modalType === "account"
                ? "Deseja realmente apagar a conta?"
                : "Deseja esvaziar as suas listas salvas?"}
            </h2>
            <button onClick={async ()=>{
               try {
                await httpService.delete("/users");
                setYesOrNoModalOpen(false);
                signOut()


              } catch (error) {
               // toast.error("Erro ao trocar senha. Tente novamente.");
                console.error("Erro ao trocar senha:", error);
              }
              window.location.replace("/");

            }} className="cursor-pointer w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700">
              {modalType === "account" ? "Apagar a conta" : "Esvaziar listas"}
            </button>
            <button
              className=" cursor-pointer w-full mt-2 border border--[var(--darkgreenhome)] py-2 rounded"
              onClick={() => setYesOrNoModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(AccountSettings);
