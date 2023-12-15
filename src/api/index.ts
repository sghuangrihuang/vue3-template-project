import request from '~/service'
import type { IGetUrl, IGetName, IGetUserEmail, IGetUserKey, IGetSpaceKey, IGetProjectKey, IGetWorkKey } from './types'

export const getConfigParameters = (data?: IGetUrl) => {
  return request<IGetUrl>({
    url: '/get_config_parameters/',
    method: 'GET',
    data
  })
}

export const getUserInfo = (data: IGetName) => {
  return request<IGetName>({
    url: '/user/',
    method: 'GET',
    data
  })
}

export const getConsumnerUserKey = (data: IGetUserEmail) => {
  return request<IGetUserEmail>({
    url: '/user/get_consumer_user_key/',
    method: 'GET',
    data
  })
}

export const getSpaceList = (data: IGetUserKey) => {
  return request<IGetUserKey>({
    url: '/add_bug/get_space_list/',
    method: 'POST',
    data
  })
}

export const getAddBugList = (data: IGetName) => {
  return request<IGetName>({
    url: '/add_bug/',
    method: 'GET',
    data
  })
}

export const getSpaceDetail = (data: IGetSpaceKey) => {
  return request<IGetSpaceKey>({
    url: '/add_bug/get_space_detail/',
    method: 'GET',
    data
  })
}

export const getWorkItems = (data: IGetProjectKey) => {
  return request<IGetProjectKey>({
    url: '/add_bug/get_work_items/',
    method: 'GET',
    data
  })
}

export const getWorkItemFields = (data: IGetWorkKey) => {
  return request<IGetWorkKey>({
    url: '/add_bug/get_work_item_fields/',
    method: 'GET',
    data
  })
}

export const createWordItem = (data: any) => {
  return request<any>({
    url: '/add_bug/create_work_item/',
    method: 'POST',
    data
  })
}

