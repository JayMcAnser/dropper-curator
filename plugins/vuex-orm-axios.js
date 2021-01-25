// see: https://vuex-orm.github.io/plugin-axios/guide/setup.html#nuxt-js-integration
import { Model } from '@vuex-orm/core'

export default ({ $axios }) => {
  Model.setAxios($axios)
}