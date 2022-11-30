import { createStore } from 'vuex';
import Auth from "@/store/auth.module";

const store = createStore({
    modules: {
        auth: Auth
    },
})

export default store
