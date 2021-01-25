/**
 * Basis column
 */

import { Model } from '@vuex-orm/core';
import Element from './Element';
import ColumnElement from "~/models/ColumnElement";

export default class Column extends Model {
  static entity = 'column'

  static fields() {
    return {
      id: this.uid(),
      title: this.string(''),
      elements: this.belongsToMany(Element, ColumnElement, 'columnId', 'elementId')
    }
  }
}
