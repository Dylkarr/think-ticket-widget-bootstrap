import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3150'

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${API_URL}/admin_auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      return response
    } catch (error: any) {
      console.error('Error detallado:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })
      throw error
    }
  },

  async firstLogin(temporaryPassword: string, newPassword: string) {
    const response = await axios.post(
      `${API_URL}/admin_auth/change-password`,
      { currentPassword: temporaryPassword, newPassword },
      { withCredentials: true },
    )
    return response.data
  },

  async createUser(userData: { firstName: string; lastName: string; email: string; role: string }) {
    const response = await axios.post(`${API_URL}/users`, userData, { withCredentials: true })
    return response.data
  },

  async logout() {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      return response.data
    } catch (error) {
      console.error('Error en logout:', error)
    }
  },

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/auth/check-session`, { withCredentials: true })
      return response.data
    } catch (error: any) {
      console.error('Error al verificar la sesión:', error)
      throw error
    }
  },
}
