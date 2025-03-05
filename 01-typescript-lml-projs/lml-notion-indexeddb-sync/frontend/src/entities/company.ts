

export interface Users {
  uid?: number,
  username: string,
  age: number,
  create_time?: string,  // 2025-03-05 11:00:03.123 
  update_time?: string,  // 2025-03-05 11:00:03.123 
} 

export interface Orders {
  oid?: number,
  content: string,
  uid: string
}

export interface Products {
  pid?: number,
  name: string,
  price: number,
}
