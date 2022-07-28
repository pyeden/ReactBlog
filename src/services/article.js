// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function fetchArticle(params = {}) {
  return request('/api/v1/', {
    method: 'GET',
    params,
  });
}
