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

describe("Testing companies vuex unit part two", () => {
    describe("test mutation addCompany", () => {
        it("should state.companies be now with new company", () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    addCompany: companies.mutations.addCompany
                }
            });
            const addCompany = {
                "Countries": [
                    "China"
                ],
                "_id": "606614aaa8083a37c823a7c8",
                "Name": "tesla",
                "NumberOfWorkers": 100000,
                "TypeOfProducts": "car produnction",
                "__v": 0
            };
            store.commit("addCompany", addCompany);

            expect(store.state.companies).toContainEqual(addCompany);
        });
    });

    describe("test vuex action loadCompanies", () => {

        it("should call networking.postCompany()", async () => {
            const store = createStore({
                state: {
                    companies: []
                },
                mutations: {
                    addCompany: companies.mutations.addCompany
                }, actions: {
                    addCompany: companies.actions.addCompany
                }
            });

            await store.dispatch("addCompany");

            expect(networking.postCompany).toHaveBeenCalled();
        });

        it("should save test data to state.companies", async () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    addCompany: companies.mutations.addCompany
                }, actions: {
                    addCompany: companies.actions.addCompany
                }
            });
            const addCompany = {
                "Countries": [
                    "China"
                ],
                "_id": "606614aaa8083a37c823a7c8",
                "Name": "tesla",
                "NumberOfWorkers": 100000,
                "TypeOfProducts": "car produnction",
                "__v": 0
            };
            networking.postCompany = jest.fn(
                async () => {
                    return new Promise(
                        (resolve, reject) => {
                            resolve(addCompany)
                        }
                    )
                }
            );

            await store.dispatch("addCompany",addCompany);

            expect(store.state.companies).toContainEqual(addCompany);
        });
    });
});
