import { shallowMount } from '@vue/test-utils'
import SmithingInput from '@/components/SmithingInput.vue'
import { createStore } from 'vuex'

describe('SmithingInput', () => {
  let store
  let mockedPostSentence

  beforeEach(() => {
    mockedPostSentence = jest.fn()
    store = createStore({
      actions: {'sentence/postSentence': mockedPostSentence}
    })
  })

  it('Renders the components', () => {
    const wrapper = shallowMount(SmithingInput)
    const input = wrapper.find({ ref: 'smithingInput' })
    const button = wrapper.find({ ref: 'smithingButton' })

    expect(input.exists()).toBe(true)
    expect(button.exists()).toBe(true)
  })

  it('Input text getting reversed', async () => {
    const inputValue = 'Hej på dig!'
    const reverserdInputValue = 'jeH åp gid!'
    const wrapper = shallowMount(SmithingInput, {
      global: {
        plugins: [store]
      }
    })

    const input = wrapper.find({ ref: 'smithingInput' })
    input.setValue(inputValue)
    expect(input.element.value).toBe(inputValue)

    await wrapper.find('form').trigger('submit.prevent')
    expect(mockedPostSentence).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.result).toBe(reverserdInputValue)
  })
})