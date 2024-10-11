import { beforeEach, it } from 'vitest'

beforeEach(async (context) => {
  // extend context
  context.foo = 'bar'
})

it('should work', (context) => {
  console.log(context.foo) //  'bar'
})