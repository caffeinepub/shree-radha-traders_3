import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ProductInput {
    name: string;
    description: string;
    category: string;
    image: ExternalBlob;
    price: bigint;
}
export interface Banner {
    id: string;
    link: string;
    image: ExternalBlob;
}
export interface Inquiry {
    id: string;
    status: InquiryStatus;
    name: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    image: ExternalBlob;
    price: bigint;
}
export enum InquiryStatus {
    new_ = "new",
    resolved = "resolved",
    inProgress = "inProgress",
    archived = "archived"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBanner(image: ExternalBlob, link: string): Promise<string>;
    addInquiry(name: string, phone: string, message: string): Promise<string>;
    addProduct(product: ProductInput): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBanner(bannerId: string): Promise<void>;
    deleteInquiry(inquiryId: string): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
    getAllBanners(): Promise<Array<Banner>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getBanner(bannerId: string): Promise<Banner>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<string>>;
    getInquiry(inquiryId: string): Promise<Inquiry>;
    getProduct(productId: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBanner(bannerId: string, image: ExternalBlob, link: string): Promise<void>;
    updateInquiryStatus(inquiryId: string, status: InquiryStatus): Promise<void>;
    updateProduct(productId: string, product: ProductInput): Promise<void>;
}
