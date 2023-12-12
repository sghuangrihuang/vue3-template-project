export interface IGetUrl {
  url: string
}

export interface IGetName {
  name: string
}

export interface IGetUserEmail {
  user_email: string
}

export interface IGetUserKey {
  user_key: string
}

export interface IGetSpaceKey extends IGetUserKey {
  space_key: string
}

export interface IGetProjectKey extends IGetUserKey {
  project_key: string
}

export interface IGetWorkKey extends IGetProjectKey {
  work_item_type_key: string
}