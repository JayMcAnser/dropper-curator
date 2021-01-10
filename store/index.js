import VuexOrm from '@vuex-orm/core';
import database from '@/database'

export const plugins = [
  VuexOrm.install(database)
]
