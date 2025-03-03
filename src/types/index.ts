export interface User {
  id: number
  name: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}
