import { companies, mockProducts as initialProducts } from "./mockData";
import { GhgEmission, ProductPCF } from "@/types/dto";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// db 역할
let dbProducts = [...initialProducts];

export const api = {
    async getEmission(): Promise<GhgEmission[]> {
        await delay(Math.floor(Math.random() * 600) + 200);
        return companies[0].emissions;
    },
    async getProducts() {
        return dbProducts;
    },
    async saveProduct(newProduct: ProductPCF) {
        await delay(500);

        const isFailure = Math.random() < 0.15;
        if (isFailure) {
            throw new Error('서버 연결에 실패했습니다.(랜덤 오류');
        }

        dbProducts = [newProduct, ...dbProducts];
        return { success: true, data: newProduct }
    }
}
