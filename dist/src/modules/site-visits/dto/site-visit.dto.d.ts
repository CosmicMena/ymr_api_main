export declare class SiteVisitDto {
    id: string;
    ipAddress: string;
    userAgent?: string;
    referer?: string;
    pageUrl?: string;
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    sessionId?: string;
    userId?: string;
    visitDuration?: number;
    createdAt: string;
}
declare const CreateSiteVisitDto_base: import("@nestjs/common").Type<Omit<SiteVisitDto, "id" | "createdAt">>;
export declare class CreateSiteVisitDto extends CreateSiteVisitDto_base {
}
declare const UpdateSiteVisitDto_base: import("@nestjs/common").Type<Partial<CreateSiteVisitDto>>;
export declare class UpdateSiteVisitDto extends UpdateSiteVisitDto_base {
}
export declare class SiteVisitFilterDto {
    userId?: string;
    sessionId?: string;
    ipAddress?: string;
    startDate?: string;
    endDate?: string;
}
export {};
