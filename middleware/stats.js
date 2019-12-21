export default function ({ route, app }) {
  return app.$axios.$post('stats', {
    url: route.fullPath
  })
}
