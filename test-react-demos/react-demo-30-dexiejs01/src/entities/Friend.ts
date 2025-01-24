export interface Friend {
  id?: number;
  name: string;
  age: number;
  contact: ContactInfo;
}

export interface ContactInfo {
  email: string;
  tel: number;
  address: {
    country: string,
    province: string,
    city: string,
    street: string,
    streetNo: number
  }
}

