import express from 'express';

import { 
    getPosts, 
    getPost, 
    createPost, 
    deletePost, 
    updatePost, 
    findPost, 
    acceptUser, 
    remPending, 
    fahrtBuchen,
    findeEigeneFahrt,
    findeEigeneMitfahrt,
    findeEigeneAnfrage,
    addSitz
} from '../controllers/posts.js';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

router.post('/', createPost);

router.get('/', getPosts);
router.get('/find', findPost);
router.get('/findeEigeneFahrt/:id', findeEigeneFahrt);
router.get('/findeEigeneMitfahrt/:id', findeEigeneMitfahrt);
router.get('/findeEigeneAnfrage/:id', findeEigeneAnfrage);
router.get('/:id', getPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);
router.patch('/addSitz/:id', addSitz);
router.patch('/buchen/:id', fahrtBuchen);
router.patch('/accept/:id', acceptUser);
router.patch('/remPending/:id', remPending);


export default router;

