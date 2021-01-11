/**
 * Fake database definition
 */

import { Database } from '@vuex-orm/core';
import  Element  from '@/models/Element';
import  Column  from '@/models/Column';
import ColumnElement from "~/models/ColumnElement";

const database = new Database();
database.register(Element);
database.register(Column);
database.register(ColumnElement);

export default database;
