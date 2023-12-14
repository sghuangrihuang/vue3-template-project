export default class UserInfo {
  public id: string = ''
  public name: string = ''
  public email: string = ''
  public mobile: string = ''
  public user_id: string = ''
  public tenant_key: string = ''
  public en_name: string = ''
  public miigo_work_item_ids: string[] = []

  public user_key: string = ''
  public user_key_list: string[] = []
  constructor(params?: { [k in keyof Partial<UserInfo>]: UserInfo[k] }) {
    if (!params) {
      return this
    }

    Object.keys(this).forEach(key => {
      // @ts-ignore
      this[key] = params[key] ?? this[key]
    })
  }
}
