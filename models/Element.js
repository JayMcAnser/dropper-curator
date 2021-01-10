/**
 * Basis element
 */

import { Model } from '@vuex-orm/core';


export default class Element extends Model {
  static entity = 'elements'

  static fields() {
    return {
      id: this.uid(),
      title: this.string(''),
      type: this.string('text'),
      text: this.string(null).nullable(),
      imageUrl: this.string('').nullable(),
      //
      // columnId: this.belongsTo(Column, '')
    }
  }
}
