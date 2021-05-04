import axios from "axios";

const baseUrl = "http://localhost:5000";

export default {
    async getLoginByToken(token) {
        try {
            const user = (await axios.get(
                `${baseUrl}/auth`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )).data;

            return user.login;
        } catch (err) {
            console.log(err);
        }
    },

    async getToken(login, password) {
        try {
            const data = (await axios.post(
                `${baseUrl}/auth/login`,
                {
                    login,
                    password
                }
            )).data;
            return data.token;
        }
        catch (err) {
            console.log(err);
        }
    },
}