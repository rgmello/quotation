import { create } from 'zustand'

interface UserData {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
}

interface AuthStore {
    allUserData: UserData | null
    loading: boolean
    user: () => UserData
    setUser: (user: UserData | null) => void
    setLoading: (loading: boolean) => void
    isLoggedIn: () => boolean
}

const useAuthStore = create<AuthStore>((set, get) => ({
    allUserData: null,
    loading: false,
    user: () => ({
        id: get().allUserData?.id || null,
        firstName: get().allUserData?.firstName || null,
        lastName: get().allUserData?.lastName || null,
        email: get().allUserData?.email || null,
        username: get().allUserData?.username || null,
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().allUserData !== null,
}))

export default useAuthStore