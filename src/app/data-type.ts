export interface SignUp {
    name: string,
    password: string,
    email: string
}

export interface login {
    email: string
    password: string,
}

export interface product {
    id: number,
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    url: string,
    quantity:undefined|number,
    productId: undefined | number
}

export interface cart {
    id: number | undefined,
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    url: string,
    quantity:undefined|number;
    userId: number,
    productId: number
}

export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface order {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: number,
    id: undefined | number
}