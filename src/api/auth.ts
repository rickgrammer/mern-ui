import {AxiosInstance} from "."

export interface SignInPayload {
  email: string
  password: string
}

export const signInApi = async (signInPayload: SignInPayload) => {
  return await AxiosInstance.post('signin', signInPayload)
}

export const signOutApi = async () => {
  return await AxiosInstance.post('signout')
}

export const getProfileApi = async () => {
  return await AxiosInstance.get('profile')
}

export const updateProfileApi = async (preference: string) => {
  return await AxiosInstance.patch('profile', {preference})
}
