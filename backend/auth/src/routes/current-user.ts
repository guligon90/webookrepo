import express from 'express';

import { currentUser } from '@webookrepo/commonp';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
	// Send the currentUser fetched in the middleware
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
