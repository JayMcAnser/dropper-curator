
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core';
import VueORMAxios from '@vuex-orm/plugin-axios'
// import database from '@/database'

import { Database } from '@vuex-orm/core';
import Element  from '@/models/Element';
import Column  from '@/models/Column';
import ColumnElement from "~/models/ColumnElement";
import Board from '@/models/Board';
import BoardColumn from '@/models/BoardColumn'


VuexORM.use(VueORMAxios )
const database = new VuexORM.Database();

database.register(Element);
database.register(Column);
database.register(ColumnElement);
database.register(Board);
database.register(BoardColumn);


export const plugins = [VuexORM.install(database)]

export const state = () => {
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
