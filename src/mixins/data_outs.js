// import * as _ from 'lodash';

import {
  convertMergeTagToCode,
  convertOutuptExampleToDataOut
} from '../helpers/utils';

const SYSTEM_PREFIX = '#';

const systemMergeTags = [
  {
    title: 'System',
    variables: [
      {
        variableName: `${SYSTEM_PREFIX}error`
      },
      {
        variableName: `${SYSTEM_PREFIX}error.message`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}error.name`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}error.stack`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session`
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.sessionId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.beginningSessionId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.previousSessionId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.startedBy`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.startTime`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.sessionType`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}session.reporting.groupId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}helpers`
      },
      {
        variableName: `${SYSTEM_PREFIX}helpers.providersAccountId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}helpers.sdkApiUrl`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}config`
      },
      {
        variableName: `${SYSTEM_PREFIX}config.accountId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}config.flowId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}config.botId`,
        subObject: true
      },
      {
        variableName: `${SYSTEM_PREFIX}config.executionStartTime`,
        subObject: true
      }
    ]
  }
];

export default {
  computed: {
    dataOuts () {
      return _.concat(this.mergeFields, systemMergeTags);
    }
  },

  methods: {
    convertMergeTagToCode (tag) {
      return convertMergeTagToCode(tag);
    },

    convertStepsToMergeTags (
      steps,
      stepId,
      type = 'session',
      variablePrefix = ''
    ) {
      // eslint-disable-line max-params
      return _.chain(steps)
        .reject({ type: 'empty' })
        .reject({ id: stepId })
        .map((step) => {
          const dataOut = _.isObject(step.data.dataOut)
            ? step.data.dataOut.name
            : step.data.dataOut;
          return {
            stepLabel: step.label,
            variableName: dataOut ? `${variablePrefix}${dataOut}` : null,
            type: _.get(step, 'data.dataOut.type', 'session'),
            outputExample: step.outputExample || null
          };
        })
        .reject({ variableName: null })
        .filter({ type })
        .reverse()
        .uniqBy('variableName')
        .sortBy('variableName')
        .flatMap(convertOutuptExampleToDataOut)
        .value();
    },

    /**
     * Convert merge-tag "display" value to a real or-sdk code it represents
     * @param {String} path - merge-tag "value"
     * @returns {String} - or-sdk code string
     */
    convertItemPathToValue (path) {
      return `\${${convertMergeTagToCode(path)}}`;
    },

    getDataOutClass (dataOut, index) {
      return `${dataOut.subObject ? 'sub-object' : 'root'} ${
        index === this.selectedTagIndex ? 'active' : ''
      }`;
    }
  }
};
