const models = require('../models');

exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Express' });
}

exports.submit_lead = (req, res, next) => {
  return models.Lead.create({
    email: req.body.lead_email
  }).then(lead => {
    res.redirect('/leads');
  })
}

exports.show_leads = (req, res, next) => {
  models.Lead.findAll().then(leads => {
    res.render('landing', { title: 'Express', leads: leads })
  })
}
