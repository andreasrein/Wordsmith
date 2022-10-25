import { shallowMount } from "@vue/test-utils"
import LoginForm from "@/components/LoginForm.vue"

describe("LoginForm", () => {
  it("Render the input fields", () => {
    const wrapper = shallowMount(LoginForm)

    const inputEmail = wrapper.get('[data-test="email"]')
    expect(inputEmail.exists())

    const inputPassword = wrapper.get('[data-test="password"]')
    expect(inputPassword.exists())
  })
})
