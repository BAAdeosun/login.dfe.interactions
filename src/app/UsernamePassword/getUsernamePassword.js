'use strict';

const get = (req, res) => {
  res.render('UsernamePassword/views/index', {
    isFailedLogin: false,
    message: '',
    title: 'Sign in',
    uuid: req.params.uuid,
    csrfToken: req.csrfToken(),
  });
};

module.exports = get;
