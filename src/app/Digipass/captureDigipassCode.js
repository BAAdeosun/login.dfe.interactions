const action = (req, res) => {
  return res.render('Digipass/views/token', {
    csrfToken: req.csrfToken(),
    code: '',
    validationMessages: {
      code: undefined,
    },
  });
};

module.exports = action;