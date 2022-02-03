import { createRxDatabase } from 'rxdb'
import { v4 as uuidv4 } from 'uuid'
import { artistSchema } from './entity.js'

import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb'
addPouchPlugin(require('pouchdb-adapter-idb'))

let dbPromise = null

async function dbInit() {
  console.log('DatabaseService: creating database..')

  const db = await createRxDatabase({
    name: process.env.RXDB_NAME,
    storage: getRxStoragePouch('idb'),
    password: process.env.RXDB_PASSWORD,
    // enable the event sharing between the two instances. For exmaple when the
    // user has opened multiple browser windows, events will be shared between
    // them so that both windows react to the same changes
    multiInstance: true,
    eventReduce: true
  })
  // attach db to the window
  window['db'] = db

  db.waitForLeadership().then(() => {
    console.log('isLeader now')
    document.title = '♛ ' + document.title
  })

  console.log('DatabaseService: create collections')
  await db.addCollections({
    artists: {
      schema: artistSchema,
    }
  })

  // Todo: sync collection to db -- Hasura?
  // messagesCollection.sync({ remote: syncURL + dbName + '/' })

  return db
}

export const get = () => {
  if (!dbPromise)
    dbPromise = dbInit();
  return dbPromise
}

export const insertArtists = async (artists, db) => {
  const data = artists.map((artist) => ({
    id: uuidv4(),
    spotify_id: artist.spotifyId,
    music_brainz_id: {
      id: artist.musicBrainzId,
      type: artist.type
    },
    name: artist.name,
    images: artist.images,
    external_urls: artist.external_urls,
    genres: artist.genres,
    area: artist.area,
    disambiguation: artist.disambiguation,
    followers: artist.followers
  }))

  await db.artists.bulkInsert(data)
}
