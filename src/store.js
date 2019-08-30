/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

const now = new Date();
const store = new Vuex.Store({
    state: {

        user: {
            name: 'User',
            img: 'dist/images/4.png'
        },
       
        sessions: [
            {
                id: 1,
                user: {
                    name: 'SGRUBot',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Buenas, em que posso te ajudar ?',
                        date: now
                    }
                ]
            }
        ],
       
        currentSessionId: 1,
    
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },

        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        SEND_MESSAGE_BOT({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: false
            });
        },
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,

        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    sendMessageBot: ({ dispatch }, content) => dispatch('SEND_MESSAGE_BOT', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
