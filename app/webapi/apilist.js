var config = require('../config');

// lambdas
var apiResourceWrapper = (...params) => config.apiBaseUrl + params.join('/');
var apiPhotoWarpper = (...params) => config.baseUrl + params.join('/');
var requestParamsWrapper = (api, ...params) => api + '?' + params.join('&');

// 分页获取
var fetchResourceWithPage = (request, offset=0, pageSize=20) => {
  let _pageParams = [
    'offset=' + offset,
    'limit=' + pageSize
  ].join('&');

  if(request.endsWith('&')) {
    return request + _pageParams;
  } else if(/\?/.test(request)) {
    return request + '&' + _pageParams;
  } else {
    return request + '/?' + _pageParams;
  }
};

/**
 * 节点
 */

// 默认主题列表
const TOPIC_API = apiResourceWrapper('topics.json');
const DETAIL_API = apiResourceWrapper('topics');

/**
 * 帖子
 */

// 最近主题
const RECENT_TOP_API = requestParamsWrapper(TOPIC_API, 'type=recent');
// 热门主题
const POP_TOPIC_API = requestParamsWrapper(TOPIC_API, 'type=popular');
// 精华主题
const EXEC_TOPIC_API = requestParamsWrapper(TOPIC_API, 'type=excellent');
// 还没有任何回复的
const NO_REPLY_API = requestParamsWrapper(TOPIC_API, 'type=no_reply');


/**
 * 动态
 */

// 职业
const JOB_API = requestParamsWrapper(TOPIC_API, 'node_id=12');
// 问答
const QA_API = requestParamsWrapper(TOPIC_API, 'node_id=20');
// 招聘
const JD_API = requestParamsWrapper(TOPIC_API, 'node_id=19');
// 活动
const AC_API = requestParamsWrapper(TOPIC_API, 'node_id=24');


module.exports = {
  TOPIC_API,
  POP_TOPIC_API,
  EXEC_TOPIC_API,
  NO_REPLY_API,
  RECENT_TOP_API,
  DETAIL_API,

  JOB_API,
  QA_API,
  JD_API,
  AC_API,

  fetchResourceWithPage
};
