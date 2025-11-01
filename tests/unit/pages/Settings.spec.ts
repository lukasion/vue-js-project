import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Settings from '@/pages/Settings.vue'
import { useSettingsStore } from '@/stores/settings.store'
import { AppSettings } from '@/types/AppSettings'
import { reactive } from 'vue'

type SettingsStore = ReturnType<typeof useSettingsStore>

vi.mock('@/stores/settings.store', () => {
  return {
    useSettingsStore: vi.fn(),
  }
})

const mockedUseSettingsStore = vi.mocked(useSettingsStore)

describe('Settings.vue', () => {
  let updateSettings: (payload: AppSettings) => void
  let storeMock: Pick<SettingsStore, 'companyName' | 'nipNumber' | 'address' | 'updateSettings'>

  beforeEach(() => {
    updateSettings = vi.fn()

    storeMock = reactive({
      companyName: 'ACME',
      nipNumber: '123456',
      address: 'Main St',
      updateSettings,
    })
  
    mockedUseSettingsStore.mockReturnValue(storeMock)
  })

  it('renders fields with initial store state', () => {
    const wrapper = mount(Settings)
    const inputs = wrapper.findAll('input')

    expect(inputs[0].element.value).toBe('ACME')
    expect(inputs[1].element.value).toBe('123456')
    expect(inputs[2].element.value).toBe('Main St')
  })

  it('updates store fields when user types', async () => {
    const wrapper = mount(Settings)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('New Company')
    await inputs[1].setValue('654321')
    await inputs[2].setValue('Updated St')

    await wrapper.vm.$nextTick()

    expect(storeMock.companyName).toBe('New Company')
    expect(storeMock.nipNumber).toBe('654321')
    expect(storeMock.address).toBe('Updated St')

    expect(wrapper.vm.companyName).toBe('New Company')
  })

  it('calls store action updateSettings on save', async () => {
    const wrapper = mount(Settings)
    await wrapper.find('button').trigger('click')

    expect(updateSettings).toHaveBeenCalledWith({
      companyName: 'ACME',
      nipNumber: '123456',
      address: 'Main St',
    })
  })
})