export default {
  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      tt.getUserInfo({
        success(res: any) {
          resolve(res)
        },
        fail(res: any) {
          reject(res)
        }
    });
    })
  }
}