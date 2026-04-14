import {integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=>new Date()).notNull()

}

export const words = pgTable('words',{
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', {length: 50}).notNull().unique(),
    type: varchar('type', {length: 50}).notNull().unique(),
    link: varchar('link', {length: 255}).notNull().unique(),
    description: varchar('description', {length: 255}),
    ...timestamps
})

export const types = pgTable('types',{
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', {length: 50}).notNull().unique(),
    wordId: integer('word_id').notNull().references(()=> words.id, {onDelete: 'restrict'}),
    ...timestamps
})

export const wordRelations = relations(words, ({many}) => ({ types: many(types)}))

export const typesRelations = relations(types, ({one, many}) => ({
    words: one(words, {
        fields: [types.wordId],
            references: [words.id],
    })
}))

export type Word = typeof words.$inferSelect
export type NewWord = typeof words.$inferInsert

export type Type = typeof types.$inferSelect
export type NewType = typeof types.$inferInsert
