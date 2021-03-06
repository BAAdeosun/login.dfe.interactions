'use strict';

const applicationsApi = require('./../../infrastructure/applications');
const { upsertCode, validateCode, deleteCode } = require('./../../infrastructure/UserCodes');
const cache = require('./../../infrastructure/cache');
const InteractionComplete = require('./../InteractionComplete');

const validateRequest = async (req) => {
  if (!req.query.clientid) {
    return 'Must specify clientid param';
  } else if (!await applicationsApi.getServiceById(req.query.clientid, req.id)) {
    return `Invalid client id. Cannot find client with id ${req.query.clientid}`;
  }

  if (!req.query.uid) {
    return 'Must specify uid param';
  }

  return undefined;
};
const parseModel = (req) => {
  const model = {
    userId: req.query.uid,
    code: undefined,
    resend: false,
    csrfToken: req.csrfToken(),
    validationMessages: {},
  };

  if (req.method.toUpperCase() === 'POST') {
    model.code = req.body.code;
    model.resend = req.body.resend || false;

    if (!model.code) {
      model.validationMessages.code = 'Please enter your authentication code';
    } else if (!model.code.match(/^[0-9]{6}$/)) {
      model.validationMessages.code = 'Please enter a valid authentication code';
    }
  }

  return model;
};
const validateEnteredCode = async (userId, code, correlationId) => {
  const result = await validateCode(userId, code, correlationId, 'SmsLogin');
  return result && result.userCode ? true : false;
};
const sendCode = async (req, bypassCacheCheck = false) => {
  const uuid = req.params.uuid;
  const uid = req.query.uid;
  const clientId = req.query.clientid;
  const cacheKey = `SMSSent:${uuid}`;

  if (!bypassCacheCheck && await cache.get(cacheKey)) {
    return;
  }

  await upsertCode(uid, clientId, 'na', req.id, 'SmsLogin');

  await cache.set(cacheKey, true, 600);
};


const get = async (req, res) => {
  const validationResult = await validateRequest(req);
  if (validationResult) {
    return res.status(400).render('shared/badRequest', {
      errorMessage: validationResult,
    });
  }

  const model = parseModel(req);

  await sendCode(req);

  return res.render('smsCode/views/code', model);
};

const post = async (req, res) => {
  const validationResult = await validateRequest(req);
  if (validationResult) {
    return res.status(400).render('shared/badRequest', {
      errorMessage: validationResult,
    });
  }

  const model = parseModel(req);

  if (model.resend) {
    await sendCode(req, true);
    model.validationMessages = {};
    return res.render('smsCode/views/code', model);
  } else {
    const modelValid = Object.keys(model.validationMessages).length === 0;
    if (!modelValid) {
      return res.render('smsCode/views/code', model);
    }

    const codeValid = modelValid ? await validateEnteredCode(model.userId, model.code, req.id) : false;
    if (!codeValid) {
      model.validationMessages.code = 'Please enter a valid authentication code';
      return res.render('smsCode/views/code', model);
    }

    await deleteCode(model.userId, req.id, 'SmsLogin');

    return InteractionComplete.process(req.params.uuid, {
      status: 'success',
      uid: model.userId,
      type: 'sms',
    }, req, res);
  }
};

module.exports = {
  get,
  post,
};
