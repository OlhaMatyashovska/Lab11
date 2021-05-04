import axios from "axios";
import store from './../store';

const baseUrl = "http://localhost:5000";

export default {
    async getCompaniesList() {
        try {
            let companies = (await axios.get(`${baseUrl}/api/company/`)).data;
            return companies;
        } catch (err) {
            console.log(err);
        }
    },

    async deleteCompany(id) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let deletedCompany = (
                await axios.delete(
                    `${baseUrl}/api/company/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data;
            return deletedCompany;
        }
        catch (err) {
            console.log(err);
        }
    },

    async postCompany(company) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let newCompany = (await axios.post(
                `${baseUrl}/api/company`,
                company,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )).data;
            return newCompany;
        } catch (err) {
            console.log(err)
        }
    },
    // async patchCompany(company,id) {
    //     try {
    //         const token = store.getters.token;
    //         if (!token)
    //             return null;
    //         let updatedCompany = (await axios.patch(
    //             `${baseUrl}/api/company/${id}`,
    //             company,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         )).data;
    //         return updatedCompany;
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

    async getCompanyById(id) {
        try {
            let company = (await axios.get(`${baseUrl}/api/company/${id}`)).data;
            return company;
        } catch (err) {
            console.log(err);
        }
    },

    async patchCompany(company, id) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let updatedCompany = (
                await axios.patch(
                    `${baseUrl}/api/company/${id}`,
                    company,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )).data;
            return updatedCompany;
        } catch (err) {
            console.log(err.response);
        }
    }
}