import networking from "../networking";

export default {
    state: {
        companies: [],
    },
    getters: {
        companies(state) {
            return state.companies;
        }
    },
    mutations: {
        setCompanies(state, companies) {
            state.companies = companies;
        },
        addCompany(state, company) {
            state.companies.push(company);
        },
        updateCompany({ companies }, company) {
            const index = companies.findIndex(b => b.Name=== company.Name);
            if (index >= 0)
                companies.splice(index, 1, company);
        },
        removeCompany({ companies }, company) {
            const index = companies.findIndex(b => b._id === company._id);
            if (index >= 0)
                companies.splice(index, 1);
        }
    },
    actions: {
        async loadCompanies({ commit }) {
            const companies = await networking.getCompaniesList();
            commit("setCompanies", companies);
        },
        async addCompany({ commit }, company) {
            let newCompany = await networking.postCompany(company);
            if (!newCompany)
                return null;
            commit("addCompany", newCompany);
            return newCompany;
        },
        async updateCompany({ commit }, company) {
            let updatedCompany = await networking.patchCompany(company, company._id);
            if (!updatedCompany)
                return null;
            commit("updateCompany", updatedCompany);
            return updatedCompany;
        },
        async deleteCompanyById({ commit }, id) {
            let deletedCompany = await networking.deleteCompany(id);
            if (!deletedCompany)
                return null;
            commit("removeCompany", deletedCompany);
            return deletedCompany;
        },
    }
}