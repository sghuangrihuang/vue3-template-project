export default {
  config: (data: any) => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      window.h5sdk.config({
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        onSuccess: (res: any) => resolve(res),
        onFail: (err: any) => reject(err)
      })
    })
  },
  ready: () => {
    return new Promise((resolve) => {
      // @ts-ignore
      window.h5sdk.ready(() => {
        resolve(true)
      })
    })
  }
}