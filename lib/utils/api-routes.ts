import { Db, MongoClient } from 'mongodb'
import { shuffle } from './common'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
  const bicycles = await db.collection('bicycles').find().toArray()
  const equipment = await db.collection('equipment').find().toArray()

  return shuffle([
    ...bicycles
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
    ...equipment
      .filter((item) => item[fieldName] && !Object.values(item.sizes).length)
      .slice(0, 2),
  ])
}
