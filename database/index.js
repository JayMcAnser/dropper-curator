/**
 * Fake database definition
 */

import { Database } from '@vuex-orm/core';
import Element  from '@/models/Element';
import Column  from '@/models/Column';
import ColumnElement from "~/models/ColumnElement";
import Board from '@/models/Board';
import BoardColumn from '@/models/BoardColumn'

const database = new Database();
database.register(Element);
database.register(Column);
database.register(ColumnElement);
database.register(Board);
database.register(BoardColumn);

export default database;
