import companies from "../../src/store/companies";
import networking from "../../src/networking";
import { createStore } from "vuex";


const testCompanies = [
    {
        "Countries": [
            "USA, China,Germany"
        ],
        "_id": "6064c58a36fe3e03049047d2",
        "Name": "Tesla",
        "NumberOfWorkers": 2000,
        "TypeOfProducts": "car production",
        "__v": 0
    },
    {
        "Countries": [
            "China"
        ],
        "_id": "606614aaa8083a37c823a7c8",
        "Name": "tesla",
        "NumberOfWorkers": 100000,
        "TypeOfProducts": "car produnction",
        "__v": 0
    }
];

jest.mock(
    "../../src/networking"
);

describe("Testing companies vuex unit part three", () => {
    describe("test mutation removeCompany", () => {
        it("should state.companies be now without the defined company", () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    removeCompany: companies.mutations.removeCompany
                }
            });
            const companyToBeRemoved = {
                "Countries": [
                    "China"
                ],
                "_id": "606614aaa8083a37c823a7c8",
                "Name": "tesla",
                "NumberOfWorkers": 100000,
                "TypeOfProducts": "car produnction",
                "__v": 0
            };
            store.commit("removeCompany", companyToBeRemoved);

            expect(store.state.companies).not.toContainEqual(companyToBeRemoved);
        });
    });

    describe("test vuex action deleteCompany", () => {

        it("should call networking.deleteCompany(id)", async () => {
            const store = createStore({
                state: {
                    companies: []
                },
                mutations: {
                    removeCompany: companies.mutations.removeCompany
                }, actions: {
                    deleteCompanyById: companies.actions.deleteCompanyById
                }
            });

            await store.dispatch("deleteCompanyById");

            expect(networking.deleteCompany).toHaveBeenCalled();
        });

        it("should remove test data from state.companies", async () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    removeCompany: companies.mutations.removeCompany
                }, actions: {
                    deleteCompanyById: companies.actions.deleteCompanyById
                }
            });
            const company= {
                Countries: [
                    "China"
                ],
                _id: "606614aaa8083a37c823a7c8",
                Name: "tesla",
                NumberOfWorkers: 100000,
                TypeOfProducts: "car produnction",
                __v: 0
            };
            networking.deleteCompany = jest.fn(
                async () => {
                    return new Promise(
                        (resolve, reject) => {
                            resolve(company)
                        }
                    )
                }
            );

            await store.dispatch("deleteCompanyById", company._id);

            expect(store.state.companies).not.toContainEqual(company);
        });
    });
});
