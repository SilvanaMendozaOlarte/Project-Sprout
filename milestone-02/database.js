import { get } from "http";
import PouchDB from "pouchdb";

/**
 * Initializes a PouchDB database with specified collections if they do not
 * exist.
 *
 * This function creates a new PouchDB instance with the given database name. It
 * attempts to retrieve collections for 'words' and 'games'. If these
 * collections do not exist, it creates them with initial empty arrays.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async (dbname) => {
 
  const db = new PouchDB(dbname);

 
  try {
    const projects = await db.get("projects");
  } catch (e) {
    await db.put({ _id: "projects", projects: [{name:'Miscellaneous Tasks', tasks:[]}]});
  }

  
  try {
    const pomodoros = await db.get("pomodoros");
  } catch (e) {
    await db.put({ _id: "pomodoros", pomodoros: [] });
  }

  try {
    const pomodoros = await db.get("shop-items");
  } catch (e) {
    await db.put({ _id: "shop-items", shop_items: [] });
  }


  await db.close();
};

/**
 * Factory function to create a database instance using PouchDB for managing
 * word and game scores.
 *
 * This function initializes a database with the given name if it does not
 * already exist. It provides methods to save scores and retrieve top scores for
 * words and games. The database is re-instantiated with each method call to
 * ensure that the most recent data is used.
 *
 * @param {string} dbname - The name of the database to initialize and use.
 * @returns {object} An object containing methods to interact with the word and
 * game scores stored in the database.
 */
const Database = async (dbname) => {
  // Initialize the database
  await initdb(dbname);

  /**
   * Helper function to create a new PouchDB instance.
   * @returns {PouchDB} A new PouchDB instance connected to the specified
   * database.
   */
  const getDB = () => new PouchDB(dbname);

  const obj = {
    saveWordScore: async (name, word, score) => {
      try {
        const db = getDB();
        const data = await db.get("words");
        data.words.push({ name, word, score });
        await db.put(data);
        await db.close();
        return { status: "success" };
      } catch (e) {
        return {
          status: "error",
          message: "Failed to save word score",
          error: e.message,
        };
      }
    },
    addProject: async (name) => {
      try{
        const db = getDB();
        const data = await db.get('projects')
        data.projects.push({name,tasks:[]})
        await db.put(data)
        await db.close()
        return {status: 'success'}
      }
      catch(e)
      {
        return {
          status: 'error',
          message: 'Failed to save project',
          error: e.message
        };
      }
    },
    getProjects: async () => {
      try{
        const db = getDB()
        const data = await db.get('projects')
        await db.close()
        return { status:'success', data: data }
      }
      catch(e)
      {
        return{ status: 'error', message: 'Failed to retrieve projects', error: e.message};
      }
    },
    addTask: async (project,name,due) => {
        try{
          const db = getDB();
          const data = await db.get('projects')
          const index = data.projects.map(e=> e.name).indexOf(project)
          const proj = data.projects[index]
          proj.tasks.push({name,due})
          await db.put(data)
          await db.close()
          return {status: 'success'}
        }
        catch(e)
        {
          return {
            status: 'error',
            message: 'Failed to save task',
            error: e.message
          };
        }
      },
      getTasksInProject: async (project) => {
        try{
          const db = getDB()
          const data = await db.get('projects')
          const index = data.projects.map(e=> e.name).indexOf(project)
          const proj = data.projects[index]
          await db.close()
          return { status:'success', data: proj.tasks }
        }
        catch(e)
        {
          return{ status: 'error', message: 'Failed to retrieve tasks', error: e.message};
        }
      },

    /**
     * Asynchronously retrieves the top 10 game scores from the database. This
     * method handles the full lifecycle of this operation, including database
     * connection, data retrieval, sorting the scores from highest to lowest,
     * and then slicing the top 10 scores for return.
     *
     * @returns {Promise<object>} A promise that resolves to an object
     *                            indicating the result of the operation. If
     *                            successful, it returns an object with `{
     *                            status: 'success', data: Array }`, where
     *                            `data` contains the top 10 game scores as an
     *                            array of objects. If an error occurs, it
     *                            returns an object with `{ status: 'error',
     *                            message: 'Failed to retrieve game scores',
     *                            error: <error message> }`.
     */
    top10GameScores: async () => {
      // TASK #9: Implement top10GameScores
      try{
        const db = getDB()
        const data = await db.get('games')
        const data2 = data.games.sort((a,b)=> b.score - a.score)
        data2.length = 10
        await db.close()
        return { status:'success', data: data2 }
      }
      catch(e)
      {
        return{ status: 'error', message: 'Failed to retrieve game scores', error: e.message};
      }
    },
  };

  return obj;
};

/**
 * Exports the Database factory function which sets up and manages a database
 * tailored for storing and retrieving game and word scores. This module
 * provides a set of operations including saving scores, fetching top scores,
 * and initializing necessary database structures.
 *
 * The exported Database function ensures each call initializes or connects to a
 * specific database instance identified by the given database name.
 *
 * @module Database
 * @function
 * @param {string} dbname - The name of the database for which the instance is
 * created and managed.
 * @returns {Object} An object containing methods for database operations like
 * saving scores and retrieving top scores.
 */
export default Database;