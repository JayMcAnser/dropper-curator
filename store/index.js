import VuexOrm from '@vuex-orm/core';
import database from '@/database'
import data from "~/data";
import Column from "~/models/Column";

export const plugins = [
  VuexOrm.install(database)
]

export const atate = () => {
  counter: 0
}
export const mutations = {
  increment(state) {
    state.counter++
  }
}
export const actions = {
  // DOES NOT GET CALLED ?????
  // async nuxtServerInit({commit}) {
  //   console.log('nuxtServerInit called')
  //   const initialData = await data();
  //   Column.create({data: initialData});
  // }
}

//actions.nuxtServerInit({commit: 1})
