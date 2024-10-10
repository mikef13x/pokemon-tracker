const router = require('express').Router();

const pokemontcgRoutes = require('./pokemontcg-api');
// const recoveryRoutes = require('./recovery-api')

router.use('/pokemon-api', pokemontcgRoutes);
// router.use('/recovery', recoveryRoutes);

module.exports = router;
