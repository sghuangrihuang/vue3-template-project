import request from '~/service'
import type { IGetParams, IGetRes } from './types'
export const getAddrsList = (data: IGetParams) => {
  return request<IGetParams, IGetRes>({
    url: '/common/postcode/getAddrs',
    method: 'GET',
    data,
  })
}