import Cookies from "js-cookie";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import httpService from "../api/fetcher";
import { TOKEN } from "../constants/urls";
import { IUser } from "../interfaces/IUser";

class AuthStore {
  user: IUser | null = null;
  isLoadingUser: boolean = true;


    constructor(){
      makeAutoObservable(this, {
        user: observable,
          isLoadingUser: observable,
          fetchUser:action,
          signOut:action
      })



    this.fetchUser(); // Chama a função de busca logo após a inicialização
  }

  fetchUser = async () => {  // Transformado em arrow function
    const token = Cookies.get(TOKEN);
    if (!token) {
      runInAction(() => { // Garantindo que a atualização do estado seja feita dentro da ação do MobX
        this.isLoadingUser = false;
      });
      return;
    }

    try {
      const response = await httpService.get<IUser>("/users/me");
      runInAction(() => {
        this.user = response;
      });
    } catch (error) {
      Cookies.remove(TOKEN);
      console.error("Erro ao buscar dados do usuário:", error);
      runInAction(() => {
        this.user = null;
      });
    } finally {
      runInAction(() => {
        this.isLoadingUser = false;
      });
    }
  };

  signOut = async ()  => {
    Cookies.remove(TOKEN);
    runInAction(() => {
      this.user = null;
    });
  }

  get isAuthenticated() {
    return !!this.user;
  }

  get isLoading() {
    return this.isLoadingUser;
  }
}

const authStore = new AuthStore();
export default authStore;
