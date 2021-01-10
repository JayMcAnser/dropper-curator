/**
 * Fake database definition
 */

import { Database } from '@vuex-orm/core';
import  Element  from '@/models/Element';
import  Column  from '@/models/Column';

const database = new Database();
database.register(Element);
database.register(Column)

export default database;
