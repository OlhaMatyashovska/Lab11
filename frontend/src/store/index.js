import {createStore, createLogger} from 'vuex';
import authorization from './authorization';
import companies from './companies';

const store = createStore({
    plugins: [createLogger()],
    modules: {
        authorization,
        companies
    },
});

export default store;