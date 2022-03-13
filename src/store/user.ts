import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            isSignIn: false,
        }
    },
    getters:{

    },
    actions:{
        signIn(){

        }
    }
})