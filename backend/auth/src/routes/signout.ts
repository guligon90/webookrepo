import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
	// Empty the cookie containing the JWT
	req.session = null;

	res.send({});
});

export { router as signOutRouter };
