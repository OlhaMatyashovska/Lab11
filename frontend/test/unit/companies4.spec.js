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

describe("Testing companies vuex unit part four", () => {
    describe("test mutation updateCompany", () => {
        it("should state.companies be now with the updated company", () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    updateCompany: companies.mutations.updateCompany
                }
            });
            const companyToBeUpdated = {
                "Countries": [
                    "China"
                ],
                "_id": "606614aaa8083a37c823a7c8",
                "Name": "tesla",
                "NumberOfWorkers": 100,
                "TypeOfProducts": "car produnction",
                "__v": 0
            };
            store.commit("updateCompany", companyToBeUpdated);

            expect(store.state.companies).toContainEqual(companyToBeUpdated);
        });
    });

    describe("test vuex action patchCompany", () => {
        
        it("should update test data in state.companies", async () => {
            const store = createStore({
                state: {
                    companies: [...testCompanies]
                },
                mutations: {
                    updateCompany: companies.mutations.updateCompany
                }, actions: {
                    updateCompany: companies.actions.updateCompany
                }
            });
            const company= {
                Countries: [
                    "China"
                ],
                _id: "606614aaa8083a37c823a7c8",
                Name: "tesla",
                NumberOfWorkers: 10000,
                TypeOfProducts: "car produnction",
                __v: 0
            };
            networking.patchCompany = jest.fn(
                async () => {
                    return new Promise(
                        (resolve, reject) => {
                            resolve(company)
                        }
                    )
                }
            );

            await store.dispatch("updateCompany", company);

            expect(store.state.companies).toContainEqual(company);
        });
    });
});