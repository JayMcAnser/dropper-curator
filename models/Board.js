/**
 * Basis Board
 */

import { Model } from '@vuex-orm/core';
import Column from './Column';
import BoardColumn from './BoardColumn';


export default class Board extends Model {
  static entity = 'board'

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      title: this.string(''),
      columns: this.belongsToMany(Column, BoardColumn, 'board', 'columnId')
    }
  }
  static apiConfig = {
    action: {
      list: {
        method: 'get',
        url: '/public/list'
      }
    }
  }
}