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

describe("Testing companies vuex unit", () => {
    describe("test mutation setCompanies", () => {
        it("should state.companies be equal to set", () => {
            const store = createStore({
                state: {
                    companies: []
                },
                mutations: {
                    setCompanies: companies.mutations.setCompanies
                }
            });

            store.commit("setCompanies", testCompanies);

            expect(store.state.companies).toEqual(expect.arrayContaining(testCompanies));
        });
    });

    describe("test vuex action loadCompanies", () => {

        it("should call networking.getCompaniesList()", async () => {
            const store = createStore({
                state: {
                    companies: []
                },
                mutations: {
                    setCompanies: companies.mutations.setCompanies
                }, actions: {
                    loadCompanies: companies.actions.loadCompanies
                }
            });

            await store.dispatch("loadCompanies");

            expect(networking.getCompaniesList).toHaveBeenCalled();
        });

        it("should save test data to state.companies", async () => {
            const store = createStore({
                state: {
                    companies: []
                },
                mutations: {
                    setCompanies: companies.mutations.setCompanies
                }, actions: {
                    loadCompanies: companies.actions.loadCompanies
                }
            });

            networking.getCompaniesList = jest.fn(
                async () => {
                    return new Promise(
                        (resolve, reject) => {
                            resolve(testCompanies)
                        }
                    )
                }
            );

            await store.dispatch("loadCompanies");

            expect(store.state.companies).toEqual(expect.arrayContaining(testCompanies));
        });
    });
});