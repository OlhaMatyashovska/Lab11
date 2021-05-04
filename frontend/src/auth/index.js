import store from  "../store";
import networking from "../networking";


export default {
    async signIn(login, password) {
        const token = await networking.getToken(login, password);
        if (token) {
            store.dispatch("logIn", login);
            store.dispatch("setToken", token);
        }
    },
    signOut() {
        store.dispatch("logOut");
        store.dispatch("removeToken");
    },
    async checkSignInStatus() {
        const login = await networking.getLoginByToken(store.getters.token);    
        if (!login || login != store.getters.login) {
            store.dispatch("logOut");
            return false;
        }
        return true;
    },
    async restoreSignInStatus() {
        try {
            store.dispatch("loadToken");
            const login = await networking.getLoginByToken(store.getters.token);
            if (login){
                store.dispatch("logIn", login);
            } else
                alert("Error","Wrong token");
        } catch(err){
            console.log(err);
        }        
    }
}