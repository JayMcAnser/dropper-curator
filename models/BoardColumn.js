/**
 * Relation between board and column
 */

import { Model } from '@vuex-orm/core';
import Board from './Board';
import Column from "~/models/Column";

export default class BoardColumn extends Model {
  static entity = 'boardColumn'

  static primaryKey = ['boardId', 'columnId']

  static fields() {
    return {
      id: this.uid(),
      boardId: this.attr(null),
      columnId: this.attr(null),
      order:this.string()
    }
  }
}
