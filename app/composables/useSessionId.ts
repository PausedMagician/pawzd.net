import { useCookie } from 'nuxt/app'
import { v4 as uuidv4 } from 'uuid'

export const useSessionId = () => {
  const sessionId = useCookie<string>('session_id', {
    maxAge: 60 * 60 * 24 * 365 // 1 year (adjust as needed)
  })

  if (!sessionId.value) {
    sessionId.value = uuidv4()
  }

  return sessionId
}
