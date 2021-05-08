import { mount } from '@vue/test-utils';
import { createStore } from "vuex";
import Companies from '../../src/components/Companies.vue';
import { createRouter, createWebHistory } from 'vue-router';

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


describe("Unit test for Companies component", () => {
    let router;

    beforeAll(()=>{
        router = createRouter({
            history:  createWebHistory(),
            routes: [
                {
                    path: "/add/",
                    component: Companies
                },
                {
                    path:"/companies",
                    component: Companies
                }
            ]
        })
    });

    it("should show no companies for companies=[] ", async () => {
        const store = createStore({
            getters: {
                companies: jest.fn(() => [])
            },
            actions: {
                loadCompanies: jest.fn()
            }
        });     
        const component = mount(Companies, {
            global: {
                plugins: [store, router]
            }
        });

        const companies = await component.findAll('li');

        expect(companies).toHaveLength(0);
        // expect(component.html()).toContain("Нема книг для показу");
    });

    it("should show companies list that displays companies and their info", async () => {
        const store = createStore({
            getters: {
                companies: jest.fn(() => testCompanies)
            },
            actions: {
                loadCompanies: jest.fn()
            }
        });    
        const component = mount(Companies, {
            global: {
                plugins: [store, router]
            }
        });

        const companies = await component.findAll('li');

        expect(companies).toHaveLength(testCompanies.length);
    });

});