import { reactive, computed } from 'vue'

interface User { id: string; email: string; name?: string; }

const state = reactive<{ user: User | null }>({ user: null })

export const useStore = () => ({
  user: computed(() => state.user),
  setUser: (u: User) => (state.user = u),
  logout: () => (state.user = null),
})
