export const PROJECT_REPOSITORY = 'https://github.com/patamimbre/backend-ai-generator';
export const TEMPLATE_REPOSITORY = 'gh:patamimbre/drizzle-apollo-template';

export const TEMPLATE_SCHEMA_PATH = 'src/db/schema.ts';

export const SYSTEM_PROMPT = `
Given a diagrammatic representation of an entity-relationship model (either in text or image format) using the following syntax:
- Entities correspond to database tables or similar, defined by a name followed by {}. For example, users {}.
- Attributes correspond to database table columns, defined within an entity definition using name type metadata. For example, id string pk.
- Relationships show the attribute-level relations between entities, using the syntax entity1.attribute > entity2.attribute or the entity-level relation entity1 > entity2.
- The type of connecting line represents the cardinality between the two entities:
  - "<" for one-to-many
  - ">" for many-to-one
  - "-" for one-to-one
  - "<>" for many-to-many
- If a relationship statement contains a name that has not been previously defined as an entity or attribute, an entity or attribute with that name will be created.

Analyze the entities and relationships in the provided diagram to generate Drizzle code for a functional SQLite database using drizzle-orm/sqlite-core.
Define the tables, columns, and relationships. Make sure to follow the provided rules and constraints for each data type and relationship type.
Use the provided code examples and explanations to guide you through the process.
The output should be a set of Drizzle ORM table definitions that represent the entities and relationships from the diagram in a valid typescript format.
Just return typescript code, avoid returning extra context or comments.
Be careful with the syntax and the imports. Import only the necessary functions and types from the proper packages. Do not import code that is not used in the solution.
Avoid using any external libraries or packages that are not explicitly mentioned in the task description.
Avoid using invalid syntax or types that are not part of the Drizzle ORM for SQLite, like datetime or float. Make sure you do not use float (use number instead) or datetime (use integer instead).
Do NOT include comments or unnecessary code in the final solution.
Output example:

"""
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('category', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
});

export const userGroups = sqliteTable('userGroup', {
  id: text('id').notNull().primaryKey(),
  groupId: text('groupId')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  split: real('split').notNull().default(1.0),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const userData = sqliteTable('userData', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  salary: integer('salary'),
  company: text('company'),
  position: text('position'),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const transactionsGroup = sqliteTable('transactionsGroup', {
  id: text('id').notNull().primaryKey(),
  groupId: text('groupId')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('categoryId')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  paymentMethodId: text('paymentMethodId')
    .notNull()
    .references(() => paymentMethods.id, { onDelete: 'cascade' }),
  amount: real('amount').notNull(),
  hasInstalment: integer('hasInstalment', { mode: 'boolean' }),
  instalmentQuantity: integer('instalmentQuantity'),
  instalmentAmount: real('instalmentAmount'),
  notes: text('notes'),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const transactions = sqliteTable('transaction', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('categoryId')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  paymentMethodId: text('paymentMethodId')
    .notNull()
    .references(() => paymentMethods.id, { onDelete: 'cascade' }),
  amount: real('amount').notNull(),
  hasInstalment: integer('hasInstalment', { mode: 'boolean' }),
  instalmentQuantity: integer('instalmentQuantity'),
  instalmentAmount: real('instalmentAmount'),
  notes: text('notes'),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const paymentMethods = sqliteTable('paymentMethod', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const notifications = sqliteTable('notification', {
  id: text('id').notNull().primaryKey(),
  from: text('from')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  to: text('to')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  groupId: text('groupId')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});

export const groups = sqliteTable('group', {
  id: text('id').notNull().primaryKey(),
  owner: text('owner')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
});
"""
`;