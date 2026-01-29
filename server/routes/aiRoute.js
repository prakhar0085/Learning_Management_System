import express from 'express';
import { searchWithAi } from '../controllers/aiController.js';
import { chatWithAi } from '../controllers/chatController.js';
import isAuthenticated from '../middlewares/isAuth.js';

let aiRouter = express.Router();

aiRouter.post('/search', searchWithAi);
aiRouter.post('/chat', isAuthenticated, chatWithAi);

export default aiRouter;
