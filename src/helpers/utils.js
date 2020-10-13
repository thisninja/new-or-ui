/* eslint-disable no-unreachable */
/* eslint-disable indent */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import * as _ from 'lodash';
import espree from 'espree';
import Fingerprint2 from 'fingerprintjs2';
import Fuse from 'fuse.js';

const restrictFocusDisabledClass = 'restrict-focus-disabled';
const SYSTEM_PREFIX = '#';

// eslint-disable-next-line valid-jsdoc

/**
 * Present merge-tag value in readable form
 * @param {string} [value=''] value to present
 * @param {{mergeTagLeftWrapper: string, mergeTagRightWrapper: string}} [options={}]
 * @returns {string} readable presentation for merge-tag
 */
export function getReadableMergeTag(value = '', options) {
    const mergeTagLeftWrapper = _.get(options, 'mergeTagLeftWrapper', '{');
    const mergeTagRightWrapper = _.get(options, 'mergeTagRightWrapper', '}');
    return _.chain(value)
        .replace(/^[`'"](.*)[`'"]$/g, '$1')
        .replace(/this\.get\([`'"](.*)[`'"]\)/g, `${mergeTagLeftWrapper}$1${mergeTagRightWrapper}`)
        .replace(/this\.session\.get\([\`'"](.*)[\`'"]\)/g, `${mergeTagLeftWrapper}#session.$1${mergeTagRightWrapper}`)
        .replace(/await this\.getShared\([\`'"](.*)[\`'"]\)/g, `${mergeTagLeftWrapper}#shared.$1${mergeTagRightWrapper}`)
        .replace(/await this\.getGlobal\([\`'"](.*)[\`'"]\)/g, `${mergeTagLeftWrapper}#global.$1${mergeTagRightWrapper}`)
        .replace(/this\.(.+)/, `${mergeTagLeftWrapper}#$1${mergeTagRightWrapper}`)
        .value();
}

/**
 * Convert all merge-tags in a string to a readable form
 * @param {string} [value=''] value to present
 * @param {{mergeTagLeftWrapper: string, mergeTagRightWrapper: string}} [options={}]
 * @returns {string} readable presentation for merge-tag
 */
export function convertMergeTagsToReadableForm(value = '', options) {
    const mergeTagLeftWrapper = _.get(options, 'mergeTagLeftWrapper', '{');
    const mergeTagRightWrapper = _.get(options, 'mergeTagRightWrapper', '}');
    return _.chain(value)
        .replace(/^[`'"](.*)[`'"]$/g, '$1')
        .replace(/\$\{this\.get\([`'"](.*?)[`'"]\)\}/g, `${mergeTagLeftWrapper}$1${mergeTagRightWrapper}`)
        .replace(/\$\{this\.session\.get\([\`'"](.*?)[\`'"]\)\}/g, `${mergeTagLeftWrapper}#session.$1${mergeTagRightWrapper}`)
        .replace(/\$\{await this\.getShared\([\`'"](.*?)[\`'"]\)\}/g, `${mergeTagLeftWrapper}#shared.$1${mergeTagRightWrapper}`)
        .replace(/\$\{await this\.getGlobal\([\`'"](.*?)[\`'"]\)\}/g, `${mergeTagLeftWrapper}#global.$1${mergeTagRightWrapper}`)
        .replace(/\$\{this\.(.+?)\}/g, `${mergeTagLeftWrapper}#$1${mergeTagRightWrapper}`)
        .value();
}

/**
 * Present text-expression value in readable form
 * @param {string} [value=''] value to present
 * @param {{mergeTagLeftWrapper: string, mergeTagRightWrapper: string}} [options={}]
 * @returns {string} readable presentation for text-expression
 */
export function getReadableTextExpression(value = '', options) {
    const mergeTagValue = _.replace(value, /\$\{(.*)\}/g, '$1');
    return getReadableMergeTag(mergeTagValue, options);
}

/**
 * converts tags with merge fields to actual code
 * @param {string} full path to get value from
 * @returns {string} readable presentation for text-expression
 */
function _convertMergeFieldTag(fullPath) {
    const keyPaths = _.split(fullPath, '.');
    const dataOutName = keyPaths.splice(0, 1);
    const path = keyPaths.join('.');
    return `await this.mergeFields['${dataOutName}'].get(${path ? `{path: '${path}'}` : ''})`;
}

// eslint-disable-next-line valid-jsdoc
/**
 * Convert readable form of expression to actual code
 * @param {string} [value=''] value to present
 * @returns {string} actual expression value
 */
export function convertMergeTagToCode(tag) {
  if (isEqual(tag, `${SYSTEM_PREFIX}error`)) {
    return "this.error";
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}error.`)) {
    return `athis.error.${tag.replace(
      new RegExp(`^${SYSTEM_PREFIX}error.`),
      ""
    )}`;
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}session.`)) {
    return `this.session.get('${tag.replace(
      new RegExp(`^${SYSTEM_PREFIX}session.`),
      ""
    )}')`;
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}helpers.`)) {
    return `this.helpers.${tag.replace(
      new RegExp(`^${SYSTEM_PREFIX}helpers.`),
      ""
    )}`;
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}config.`)) {
    return `this.config.${tag.replace(
      new RegExp(`^${SYSTEM_PREFIX}config.`),
      ""
    )}`;
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}request.`)) {
    return `this.request.${tag.replace(
      new RegExp(`^${SYSTEM_PREFIX}request.`),
      ""
    )}`;
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}shared.`)) {
    const fullPath = tag.replace(new RegExp(`^${SYSTEM_PREFIX}shared.`), "");
    return _convertMergeFieldTag(fullPath);
  }
  if (tag.startsWith(`${SYSTEM_PREFIX}global.`)) {
    const fullPath = tag.replace(new RegExp(`^${SYSTEM_PREFIX}global.`), "");
    return _convertMergeFieldTag(fullPath);
  }
  return _convertMergeFieldTag(tag);
}

/**
 * Get middle part of the string representing parts of template string like
 * `string${, `string`, }string`, }string${ and `string`
 * @param {Object} token token to parse
 * @returns {string} extracted string from text expression
 */
function _extractStringFromTemplateToken(token) {
    if (token.type !== 'Template') {
        return '';
    }

    if (token.value.substr(-2, 2) === '${') {
        return token.value.substring(1, token.value.length - 2);
    }

    return token.value.substring(1, token.value.length - 1);
}

/**
 * Get string value from '' and "" strings or from string part of template string
 * (e.g. `string${, `string`, }string`, }string${ and `string`)
 * @param {Object} token token to parse
 * @returns {string} properly formatted value
 */
function _extractStringValue(token) {
    const { value } = token;
    const slashSubstitute = '#sweet_slash_of_mine_823cd925_slash#';

    if (_.head(value) === '\'') {
        return _.chain(value.substring(1, value.length - 1))
            .replace(/\\\\/g, slashSubstitute)
            .replace(/\\/g, '')
            .replace(new RegExp(slashSubstitute, 'g'), '\\')
            .value();
    }

    if (_.head(value) === '"') {
        return JSON.parse(value);
    }

    return _.chain(token)
        .thru(_extractStringFromTemplateToken)
        .replace(/\\\\/g, slashSubstitute)
        .replace(/\\/g, '')
        .replace(new RegExp(slashSubstitute, 'g'), '\\')
        .value();
}

/**
 * Does a given token represent beginning of template string (e.g. `string ${ or `string`)
 * @param {Object} token token to parse
 * @returns {Boolean} true if token is in a start of template token
 */
function _isStartTemplateToken(token) {
    return token.type === 'Template' && _.head(token.value) === '`';
}

/**
 * Does a given token represent ending of template string (e.g. }string` or `string`)
 * @param {Object} token token to parse
 * @returns {boolean} true if token is last token in a template
 */
function _isEndTemplateToken(token) {
    return token.type === 'Template' && _.last(token.value) === '`';
}

/**
 * Does a given token represent beginning of template string expression (e.g. "something${")
 * @param {Object} token token to parse
 * @returns {boolean} true if token is first token in a string template expression ${
 */
function _isStartTemplateExprToken(token) {
    return token.type === 'Template' && token.value.substr(-2, 2) === '${'; // eslint-disable-line no-magic-numbers
}

/**
 * Does a given token represent ending of template string expression (e.g. "}something")
 * @param {Object} token token to parse
 * @returns {boolean} true if token is last token in a string template expression }
 */
function _isEndTemplateExprToken(token) {
    return token.type === 'Template' && _.head(token.value) === '}';
}

/**
 * From a given array of token extact all tokens part of a template string ${} expression
 * @param {Array} tokens - tokens array to look in
 * @param {Number} startWith - a position in  array to start search from
 * @returns {Array} - token belonging to template string ${} expression
 */
function _getAllTemplateExprTokens(tokens, startWith) {
    const exprTokens = [tokens[startWith]];
    let endReached = false;
    /* eslint-disable */
    for (let i = startWith + 1; i < tokens.length && !endReached; i++) {
        exprTokens.push(tokens[i]);
        if (_isEndTemplateExprToken(tokens[i])) {
            endReached = true;
        }
    }
    /* eslint-enable */
  return exprTokens;
}

/**
 * Figure out if a given tokens array represent ${this.get('stuff')} js expression
 * @param {Array} tokens list of token to parse
 * @returns {boolean} returns true if tokens represent get expression
 */
function _isGetExpressionTokens (tokens) {
  return tokens.length === 8 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'this' &&
        tokens[2].value === '.' &&
        tokens[3].value === 'get' &&
        tokens[4].value === '(' &&
        tokens[5].type === 'String' &&
        tokens[6].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${this.session.get('stuff')} js expression
 * @param {Array} tokens list of token to parse
 * @returns {boolean} returns true if tokens represent session get expression
 */
function _isSessionGetExpressionTokens (tokens) {
  return tokens.length === 10 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'this' &&
        tokens[2].value === '.' &&
        tokens[3].value === 'session' &&
        tokens[4].value === '.' &&
        tokens[5].value === 'get' &&
        tokens[6].value === '(' &&
        tokens[7].type === 'String' &&
        tokens[8].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${this.get('stuff', 'default')} js expression
 * @param {Array} tokens tokens to parse
 * @returns {boolean} returns true if token represent get expression with default value
 */
function _isGetDefaultExpressionTokens (tokens) {
  return tokens.length === 10 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'this' &&
        tokens[2].value === '.' &&
        tokens[3].value === 'get' &&
        tokens[4].value === '(' &&
        tokens[5].type === 'String' &&
        tokens[6].value === ',' &&
        tokens[7].type === 'String' &&
        tokens[8].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${this.session.get('stuff', 'default')} js expression
 * @param {Array} tokens tokens to parse
 * @returns {boolean} returns true if token represent session get expression with default value
 */
function _isSessionGetDefaultExpressionTokens (tokens) {
  return tokens.length === 12 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'this' &&
        tokens[2].value === '.' &&
        tokens[3].value === 'session' &&
        tokens[4].value === '.' &&
        tokens[5].value === 'get' &&
        tokens[6].value === '(' &&
        tokens[7].type === 'String' &&
        tokens[8].value === ',' &&
        tokens[9].type === 'String' &&
        tokens[10].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${await this.[functionName]('stuff')} js expression
 * @param {Array} tokens list of token to parse
 * @param {String} functionName that should be parsed as getter
 * @returns {boolean} returns true if tokens represent session get expression
 */
function _isAsyncFunctionExpressionTokens (tokens, functionName) {
  return tokens.length === 9 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'await' &&
        tokens[2].value === 'this' &&
        tokens[3].value === '.' &&
        tokens[4].value === functionName &&
        tokens[5].value === '(' &&
        tokens[6].type === 'String' &&
        tokens[7].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${await this.[functionName]('stuff', 'default')} js expression
 * @param {Array} tokens tokens to parse
 * @param {String} functionName that should be parsed as getter
 * @returns {boolean} returns true if token represent session get expression with default value
 */
function _isAsyncFunctionDefaultExpressionTokens (tokens, functionName) {
  return tokens.length === 11 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'await' &&
        tokens[2].value === 'this' &&
        tokens[3].value === '.' &&
        tokens[4].value === functionName &&
        tokens[5].value === '(' &&
        tokens[6].type === 'String' &&
        tokens[7].value === ',' &&
        tokens[8].type === 'String' &&
        tokens[9].value === ')' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${await this.mergeFields[mergeFieldName].get(...)} js expression
 * @param {Array} tokens tokens to parse
 * @param {String} functionName that should be parsed as getter
 * @returns {boolean} returns true if token represent session get expression with default value
 */
function _isAsyncFunctionMergeFieldExpressionTokens (tokens) {
  return tokens.length >= 13 &&
        _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'await' &&
        tokens[2].value === 'this' &&
        tokens[3].value === '.' &&
        tokens[4].value === 'mergeFields' &&
        tokens[5].value === '[' &&
        tokens[6].type === 'String' &&
        tokens[7].value === ']' &&
        tokens[8].value === '.' &&
        tokens[9].value === 'get' &&
        tokens[10].value === '(' &&
        _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Figure out if a given tokens array represent ${this.helpers.stuff} (or other allowed services) js expression
 * @param {Array} tokens tokens to parse
 * @returns {Boolean} returns true if token represent allowed expression
 */
function _isAllowedExpressionTokens (tokens) {
  const allowedConditionStart = _isStartTemplateExprToken(_.head(tokens)) &&
        tokens[1].value === 'this' &&
        tokens[2].value === '.' &&
        _.includes(['helpers', 'request', 'config', 'error'], tokens[3].value);

  return tokens.length === 5 &&
      allowedConditionStart ||
      tokens.length > 5 &&
      allowedConditionStart &&
      _isEndTemplateExprToken(_.last(tokens));
}

/**
 * Extracts path part from ${this.get('path')} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|string} returns '' if there're no expression tokens or object with path instead
 */
function _extractGetExpressionFromTokens (tokens) {
  if (!_isGetExpressionTokens(tokens)) {
    return '';
  }

  return { path: _extractStringValue(tokens[5]) };
}

/**
 * Extracts 'path' and 'default' parts from ${this.get('path', default)} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractGetDefaultExpressionFromTokens (tokens) {
  if (!_isGetDefaultExpressionTokens(tokens)) {
    return '';
  }

  return {
    path: _extractStringValue(tokens[5]),
    defaultValue: _extractStringValue(tokens[7])
  };
}

/**
 * Extracts path part from ${this.get('path')} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|string} returns '' if there're no expression tokens or object with path instead
 */
function _extractSessionGetExpressionFromTokens (tokens) {
  if (!_isSessionGetExpressionTokens(tokens)) {
    return '';
  }

  return { path: `${SYSTEM_PREFIX}session.${_extractStringValue(tokens[7])}` };
}

/**
 * Extracts 'path' and 'default' parts from ${this.get('path', default)} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractSessionGetDefaultExpressionFromTokens (tokens) {
  if (!_isSessionGetDefaultExpressionTokens(tokens)) {
    return '';
  }

  return {
    path: `${SYSTEM_PREFIX}session.${_extractStringValue(tokens[7])}`,
    defaultValue: _extractStringValue(tokens[9])
  };
}

/**
 * Extracts path part from ${await this.getShared('path')} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|string} returns '' if there're no expression tokens or object with path instead
 */
function _extractSharedGetExpressionFromTokens (tokens) {
  if (!_isAsyncFunctionExpressionTokens(tokens, 'getShared')) {
    return '';
  }

  return { path: `${SYSTEM_PREFIX}shared.${_extractStringValue(tokens[6])}` };
}

/**
 * Extracts 'path' and 'default' parts from ${await this.getShared('path', default)} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractSharedGetDefaultExpressionFromTokens (tokens) {
  if (!_isAsyncFunctionDefaultExpressionTokens(tokens, 'getShared')) {
    return '';
  }

  return {
    path: `${SYSTEM_PREFIX}shared.${_extractStringValue(tokens[6])}`,
    defaultValue: _extractStringValue(tokens[8])
  };
}

/**
 * Extracts path part from ${await this.getGlobal('path')} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|string} returns '' if there're no expression tokens or object with path instead
 */
function _extractGlobalGetExpressionFromTokens (tokens) {
  if (!_isAsyncFunctionExpressionTokens(tokens, 'getGlobal')) {
    return '';
  }

  return { path: `${SYSTEM_PREFIX}global.${_extractStringValue(tokens[6])}` };
}

/**
 * Extracts 'path' and 'default' parts from ${await this.getGlobal('path', default)} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractGlobalGetDefaultExpressionFromTokens (tokens) {
  if (!_isAsyncFunctionDefaultExpressionTokens(tokens, 'getGlobal')) {
    return '';
  }

  return {
    path: `${SYSTEM_PREFIX}global.${_extractStringValue(tokens[6])}`,
    defaultValue: _extractStringValue(tokens[8])
  };
}

/**
 * Extracts 'path' and 'default' parts from ${await this.getGlobal('path', default)} expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractMergeFieldExpressionFromTokens (tokens) {
  const path = _.get(_.map(tokens, 'value').join('').match(/\bpath: *'(.*?)'/), '[1]');
  const dafalutValue = _.get(_.map(tokens, 'value').join('').match(/\bdefaultValue: *'(.*?)'/), '[1]');

  console.log('path', { path, dafalutValue });
  return {
    path: `${_extractStringValue(tokens[6])}${path ? `.${path}` : ''}`,
    defaultValue: dafalutValue
  };
}

/**
 * Extracts 'path' part from ${this.helpers.path} (or another allowed service) expression
 * and returns object containing this info
 * @param {Array} tokens list of token
 * @returns {Object|String} returns '' if there're no expression tokens or object with path instead
 */
function _extractAllowedExpressionFromTokens (tokens) {
  if (!_isAllowedExpressionTokens(tokens)) {
    return '';
  }
  const path = _.reduce(tokens, (memo, token, index) => {
    if (index > 4 && index < tokens.length - 1) {
      memo += token.value;
    }
    return memo;
  }, '');

  return {
    path: `${SYSTEM_PREFIX}${tokens[3].value}${path ? `.${path}` : ''}`
  };
}

/**
 * Figure out if a given expression is 'string', "string", `string ${this.get('stuff', 'default')}`,
 * `string ${this.session.get('stuff', 'default')}`, `string ${this.helpers.stuff}`
 * @param {string} expression expression to extract from
 * @returns {Array|undefined} list of expressions
 */
export function stringifyExpression (expression) { // eslint-disable-line complexity
  let tokens;
  try {
    const espreeOptions = {
      ecmaVersion: 9,
      ecmaFeatures: {
        globalReturn: true,
        impliedStrict: true
      }
    };
    tokens = espree.tokenize(expression, espreeOptions);
  } catch (e) {
    return;
  }
  const firstToken = _.head(tokens);

  // expression is a simple single- or double-quoted string
  if (tokens.length === 1 && firstToken.type === 'String') {
    return [_extractStringValue(firstToken)];
  }
  // expression is a "plain" string expression/template (e.g. `plain string`)
  if (tokens.length === 1 && _isStartTemplateToken(firstToken) && _isEndTemplateToken(firstToken)) {
    return [_extractStringValue(firstToken)];
  }
  // expression is a string expression/template (e.g. `string ${template}`) if it starts and ends with `
  if (tokens.length > 1 && _isStartTemplateToken(firstToken) && _isEndTemplateToken(_.last(tokens))) {
    // fill in first "string" part of the text even if it's empty
    const result = [_extractStringValue(firstToken)];
    let i = 0;
    // check ${} parts of string template
    while (i < tokens.length - 1) {
      const templateExprTokens = _getAllTemplateExprTokens(tokens, i);
      const templateExprTokensLength = templateExprTokens.length;
      // if next tokens represent ${this.get('stuff')} expression extract them and look further
      if (_isGetExpressionTokens(templateExprTokens)) {
        result.push(_extractGetExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.get('stuff', 'default')} expression extract them and look further
      } else if (_isGetDefaultExpressionTokens(templateExprTokens)) {
        result.push(_extractGetDefaultExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.session.get('stuff')} expression extract them and look further
      } else if (_isSessionGetExpressionTokens(templateExprTokens)) {
        result.push(_extractSessionGetExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.session.get('stuff', 'default')} expression extract them and look further
      } else if (_isSessionGetDefaultExpressionTokens(templateExprTokens)) {
        result.push(_extractSessionGetDefaultExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.shared.get('stuff')} (or other "supported" service call) expression extract them and look further
      } else if (_isAsyncFunctionExpressionTokens(templateExprTokens, 'getShared')) {
        result.push(_extractSharedGetExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.shared.get('stuff', 'default')} expression extract them and look further
      } else if (_isAsyncFunctionDefaultExpressionTokens(templateExprTokens, 'getShared')) {
        result.push(_extractSharedGetDefaultExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.helpers.stuff} (or other "supported" service call) expression extract them and look further
      } else if (_isAsyncFunctionExpressionTokens(templateExprTokens, 'getGlobal')) {
        result.push(_extractGlobalGetExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.shared.get('stuff', 'default')} expression extract them and look further
      } else if (_isAsyncFunctionDefaultExpressionTokens(templateExprTokens, 'getGlobal')) {
        result.push(_extractGlobalGetDefaultExpressionFromTokens(templateExprTokens));
        // if next tokens represent ${this.helpers.stuff} (or other "supported" service call) expression extract them and look further
      } else if (_isAsyncFunctionMergeFieldExpressionTokens(templateExprTokens)) {
        result.push(_extractMergeFieldExpressionFromTokens(templateExprTokens));
      } else if (_isAllowedExpressionTokens(templateExprTokens)) {
        result.push(_extractAllowedExpressionFromTokens(templateExprTokens));
        // otherwise it's not convertible
      } else {
        return;
      }
      // extract string value that goes after get expression
      result.push(_extractStringValue(tokens[i + templateExprTokensLength - 1]));
      i += templateExprTokensLength - 1;
    }

    return _.compact(result);
  }
}

/**
 * Check if string is valid onereach expression
 * @param {Array/undefined} array of expression tokens
 * @returns {Boolean}
 */
export function isStringExpression (expression, mergeFields = []) {
  return Boolean(stringifyExpression(expression, mergeFields));
}

/**
 * Method performs search
 * @param {Array} objects is a array of objects where we should search
 * @param {Array} keys is a array of object keys to serach in
 * @param {String} value is a search phrase
 * @param {Object} [options={}] is a set of custom options to override default
 * @returns {Array} of found elements
 */
export function fuzzySearch (objects, keys, value, options = {}) { // eslint-disable-line max-params
  const defaultOptions = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    includeScore: true,
    threshold: 0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys // pass keys name, example ['firstName', 'data.type']
  };

  const fuseOptions = _.assign({}, defaultOptions, options);

  // if provided search string is empty - return original results
  if (!value) {
    return objects;
  }

  const fuse = new Fuse(objects, fuseOptions);
  // object structure is different if score is true
  return _.map(fuse.search(value), 'item');
}

/**
 * @returns {Boolean} - true is focusRestriction is globally disabled
 */
export function isFocusRestrictionDisabledGlobally () {
  return document.body.classList.contains(restrictFocusDisabledClass);
}

/**
 * disable focusRestriction globally (used in or-modal)
 */
export function disableFocusRestrictionGlobally () {
  document.body.classList.add(restrictFocusDisabledClass);
}

/**
 * enable focusRestriction globally (used in or-modal)
 */
export function enableFocusRestrictionGlobally () {
  document.body.classList.remove(restrictFocusDisabledClass);
}

/**
 * generate browser fingerprint
 */
export async function generateFingerPrint () {
  const fingerPrintComponents = await new Promise((resolve) => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        Fingerprint2.get((components) => {
          resolve(components);
        });
      });
    } else {
      setTimeout(() => {
        Fingerprint2.get((components) => {
          resolve(components);
        });
      }, 500);
    }
  });

  return Fingerprint2.x64hash128(_.flatMap(fingerPrintComponents, 'value').join(''), 31);
}

/**
 * private function to flatten Output example DataOuts
 */
function _flattenSubDataOuts (data, mergeTag) {
  const result = {};
  const recurse = (cur, prop, root) => {
    if (_.isArray(cur) && !_.isEmpty(cur)) {
      result[prop] = [];
      _.forEach(cur, (value, key) => {
        recurse(value, prop || _.isNumber(prop) ? `${prop}[${key}]` : `[${key}]`);
      });
    } else if (_.isObject(cur) && !_.isEmpty(cur)) {
      if (!root) {
        result[prop] = cur;
      }
      _.forEach(cur, (value, key) => {
        recurse(value, prop || _.isNumber(prop) ? `${prop}.${key}` : key);
      });
    } else if (_.isArray(cur) && _.isEmpty(cur)) {
      result[prop] = [];
    } else if (_.isObject(cur) && _.isEmpty(cur) && !root) {
      result[prop] = {};
    } else if (!root) {
      result[prop] = cur;
    }
  };
  recurse(data, mergeTag, true);
  return result;
}

/**
 * Method convert Datout with OutputExample to array of dataouts
 * @param {Object} DataOUt to be converted
 * @returns {Array} of composed DataOuts
 */
export function convertOutuptExampleToDataOut (dataOut) {
  let subData = [];
  if (_.isObject(dataOut.outputExample) || _.isArray(dataOut.outputExample)) {
    const dataOutObj = {};
    dataOutObj[dataOut.variableName] = dataOut.outputExample;
    const flattenedSubOuts = _flattenSubDataOuts(dataOut.outputExample, dataOut.variableName);
    subData = _.chain(flattenedSubOuts)
      .keys()
      .sortBy()
      .map(subDataOut => ({
        stepLabel: dataOut.stepLabel,
        flowId: dataOut.flowId,
        variableName: subDataOut,
        subObject: true,
        outputExample: flattenedSubOuts[subDataOut]
      }))
      .value();
  }
  return [dataOut].concat(subData);
}

/**
 * Method convert Step to array of dataouts
 * @param {Object} step to be converted
 * @param {String} id of current step
 * @param {String} dataout type, may be one of a type ['session', 'shared', 'global']
 * @param {String} prefix for result dataouts
 * @returns {Array} of composed DataOuts
 */
export function convertStepsToMergeTags (steps, stepId, type = 'session', variablePrefix = '') { // eslint-disable-line max-params
  return _.chain(steps)
    .reject({ type: 'empty' })
    .reject({ id: stepId })
    .map((step) => {
      const dataOut = _.isObject(step.data.dataOut) ? step.data.dataOut.name : step.data.dataOut;
      return {
        stepLabel: step.label,
        variableName: dataOut ? `${variablePrefix}${dataOut}` : null,
        type: _.get(step, 'data.dataOut.type', 'session'),
        outputExample: step.outputExample || null,
        name: dataOut
      };
    })
    .reject({ variableName: null })
    .filter({ type })
    .reverse()
    .uniqBy('variableName')
    .sortBy('variableName')
    .flatMap(convertOutuptExampleToDataOut)
    .value();
}

/**
 * Checks if a given object is a JS object
 * replacement for _.isString
 * @param {string} string source
 * @returns {boolean} showing whether a value is a string
 */
function isString (str) {
  if (str && typeof str.valueOf() === 'string') {
    return true;
  }
  return false;
}

/**
 * Checks if a given object is a JS object
 * replacement for _.isObject
 * @param {object} object source
 * @returns {boolean} showing whether an object is a JS object
 */
function isObject (obj) {
  return obj != null && obj.constructor.name === 'Object';
}

/**
 * Checks if key is a direct property of object. Key may be a path of a value separated by .
 * replacement for _.has
 * @param {object} object source
 * @param {string} key to check agains
 * @returns {boolean} showing whether a key exist
 */
const has = function (obj, key) {
  var keyParts = key.split('.');

  return (
    !!obj &&
    (keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : hasOwnProperty.call(obj, key))
  );
};

/**
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function hasIn (object, key) {
  return object != null && key in Object(object);
}

/**
 * Compares two values for equality
 * replacement for _.isEqual
 * @param {any} first value
 * @returns {any} second value
 */
function isEqual (val1, val2) {
  return JSON.stringify(val1) === JSON.stringify(val2);
}

export default {
  fuzzySearch,
  getReadableTextExpression,
  getReadableMergeTag,
  convertMergeTagToCode,
  convertMergeTagsToReadableForm,
  isFocusRestrictionDisabledGlobally,
  disableFocusRestrictionGlobally,
  enableFocusRestrictionGlobally,
  generateFingerPrint,
  convertOutuptExampleToDataOut,
  stringifyExpression,
  isStringExpression,
  convertStepsToMergeTags,
  isString,
  isObject,
  has,
  hasIn,
  isEqual
};
