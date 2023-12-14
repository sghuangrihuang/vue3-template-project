export default class TTUserInfo {
  public avatarUrl: string = ''
  public city: string = ''
  public country: string = ''
  public gender: string = ''
  public language: string = ''
  public nickName: string = ''
  public province: string = ''
  constructor(params?: { [k in keyof Partial<TTUserInfo>]: TTUserInfo[k] }) {
    if (!params) {
      return this
    }

    Object.keys(this).forEach(key => {
      // @ts-ignore
      this[key] = params[key] ?? this[key]
    })
  }
}
