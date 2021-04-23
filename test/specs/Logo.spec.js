import test from 'ava'
import { mount } from '@vue/test-utils'
import Generator from '@/components/Generator.vue'

test('is Generator a Vue instance', (t) => {
  const wrapper = mount(Generator)
  t.truthy(wrapper.vm)
})
