export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
}

 export class ProductListResponse {
    items: Product[];
    totalQty: number;
    currentPage: number;
}

export class ProductListRequest {
    search?: string;
    currentPage = 1;
    itemsPerPage = 12;
    isDescending = false;
}

// POST /products/list
//  - request ProductListRequest
//  - response ProductListResponse
// POST /products/{id}
//  - request {}
//  - response Product
// POST /products/create
//  - request Product
//  - response 200
// POST /products/edit/{id}
//  - request Product
//  - response 200
// POST /products/delete/{id}
//  - request {}
//  - response 200