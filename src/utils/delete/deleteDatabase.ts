import { table } from "../../types"
import dbExist from "../read/dbExists"
import config from "../../config.json"
import fs from 'fs'
import { deletedDB } from "./types"

const { databasePath } = config

const deleteDatabase = (dbName: string): deletedDB => {
  if (!dbName) {
    throw new Error('You have to provide the database name')
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }

  const path = databasePath + dbName + '/'

  let dbInfo: {name: string, tables: Array<table>}

  const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))

  dbInfo = {
    name: dbName,
    tables: tables
  }

  fs.rmSync(path, {recursive: true, force: true})

  return { deletedType: 'Database', deletedCount: 1, deleted: dbInfo }
}

export default deleteDatabase