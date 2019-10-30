const express = require('express')
const logger = require('../logger')
const uuid = require('uuid/v4')
const BOOKMARKSTORE = require('./bookmarkstore')

const bookRouter = express.Router()
const bodyParser = express.json()

bookRouter
    .route('/bookmark')
    .get((req, res) => {
        res
            .json(BOOKMARKSTORE);
      })
    .post((req, res) => {
        const {
            title,
            content
        } = req.body;
        if (!title) {
            logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid data');
        }
        if (!content) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Invalid data');
        }
        const uuid = BOOKMARKSTORE.length + 1;
        const bookmark = {
            uuid,
            title,
            content
        };
        BOOKMARK.push(bookmark);
        logger.info(`Bookmark with id ${uuid} created`);
        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${uuid}`)
            .json({
                uuid
            });
    }) 
    
bookRouter
    .route('./bookmark/:id')
    .get((req, res) => {
        const {id} = req.params;
        const bookmark = BOOKMARKSTORE.find(c => c.id == id);
      
        // make sure we found a bookmark; if not, return not found
        if (!bookmark) {
          logger.error(`Bookmark with id ${id} not found.`);
          return res
            .status(404)
            .send('Bookmark Not Found');
        }
      
        res.json(bookmark);
      })
    .delete((req, res) => {
        const {id} = req.params;
        const bookmarkIndex = BOOKMARKSTORE.findIndex(c =>  c.id.toString() === id);
      
        if (bookmarkIndex === -1) {
          logger.error(`bookmark with id ${id} not found.`);
          return res
            .status(404)
            .send('Not found');
        }
      
        BOOKMARKSTORE.splice(bookmarkIndex, 1);
      
        logger.info(`bookmark with id ${id} deleted.`);
      
        res
          .status(204)
          .end();
      });   

    module.exports = bookRouter;