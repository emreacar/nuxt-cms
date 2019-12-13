/* eslint-disable no-console */
export default function ({ $axios, error }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((msg) => {
    const code = parseInt(msg.response && msg.response.status)
    error({ status: code, message: msg })
    return Promise.resolve(false)
  })
}
