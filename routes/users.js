const { Router } = require('express');

const { gerUsers, 
        postUsers,
        putUsers,
        patchUsers,
        deleteUsers,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', gerUsers);  

router.post('/', postUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers );

router.delete('/', deleteUsers);


module.exports = router;