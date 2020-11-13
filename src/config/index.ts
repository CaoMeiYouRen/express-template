const env = process.env
export const PORT = Number(process.env.PORT || 5000)
/**
 * 本机数据库的账号
 */
const auth = { user: 'test', password: '123456' }

const rootUrl = '/'
export { rootUrl, auth }