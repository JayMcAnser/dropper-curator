/**
 * Relation between column and element
 */

import { Model } from '@vuex-orm/core';
import Element from './Element';
import Column from "~/models/Column";

export default class ColumnElement extends Model {
  static entity = 'columnElement'

  static primaryKey = ['columnId', 'elementId']

  static fields() {
    return {
      id: this.uid(),
      columnId: this.attr(null),
      elementId: this.attr(null),
      order:this.string()
    }
  }
}
