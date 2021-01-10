/**
 * Basis column
 */

import { Model } from '@vuex-orm/core';
import Element from './Element';

export default class Column extends Model {
  static entity = 'columns'

  static fields() {
    return {
      id: this.uid(),
      title: this.string(''),
    }
  }
}
