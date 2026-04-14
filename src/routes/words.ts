import express from "express";
import {and, desc, eq, getTableColumns, ilike, sql} from "drizzle-orm";
import {types, words} from "../db/schema";
import {db} from "../db";

const router = express.Router();

router.get("/", async(req, res)=>{
    try{
        const {search, page =1, limit = 10} = req.query;

        const currentPage = Math.max(1, +page);
        const limitPerPage = Math.max(1, +limit);

        const offset = (currentPage -1)* limitPerPage;

        const filterConditions = [];

        if (search){
            filterConditions.push(
                ilike(words.name, `%${search}%`)
            )
        }

        const whereClause = filterConditions.length > 0 ? and(...filterConditions) : undefined;

        const countResult = await db.select({ count: sql<number> `count(*)`}).from(words).where(whereClause)

        const totalCount = countResult[0]?.count ?? 0

        const wordsList = await db.select({
            ...getTableColumns(words),
            type: getTableColumns(types)
        }).from(words).leftJoin(types, eq(types.wordId, words.id)).where(whereClause).orderBy(desc(words.createdAt)).limit(limitPerPage).offset(offset)

        res.status(200).json({
            data: wordsList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount/limitPerPage)
            }
        })
    }catch(e){
        console.error(`GET /words error: ${e}`);
        res.status(500).json({error: 'Failed to get words'});
    }
})

export default router