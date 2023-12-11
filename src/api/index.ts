import request from '~/service'
import type { IGetUrl } from './types'
export const getConfigParameters = (data?: IGetUrl) => {
  return request<IGetUrl>({
    url: '/get_config_parameters',
    method: 'GET',
    data
  })
}

