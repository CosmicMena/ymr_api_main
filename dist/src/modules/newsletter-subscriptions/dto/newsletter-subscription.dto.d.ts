export declare class NewsletterSubscriptionDto {
    id: string;
    email: string;
    name?: string;
    isActive: boolean;
    interests: string[];
    subscribedAt: string;
    unsubscribedAt?: string;
}
declare const CreateNewsletterSubscriptionDto_base: import("@nestjs/common").Type<Omit<NewsletterSubscriptionDto, "id" | "subscribedAt" | "unsubscribedAt">>;
export declare class CreateNewsletterSubscriptionDto extends CreateNewsletterSubscriptionDto_base {
}
declare const UpdateNewsletterSubscriptionDto_base: import("@nestjs/common").Type<Partial<CreateNewsletterSubscriptionDto>>;
export declare class UpdateNewsletterSubscriptionDto extends UpdateNewsletterSubscriptionDto_base {
}
export declare class NewsletterSubscriptionFilterDto {
    email?: string;
    isActive?: boolean;
    interest?: string;
    startDate?: string;
    endDate?: string;
}
export {};
