export const EDGES: Array<[string, string]> = [
  ['frontend', 'api'],
  ['api', 'queue'],
  ['queue', 'worker'],
  ['worker', 'redis'],
  ['worker', 'db'],
]
