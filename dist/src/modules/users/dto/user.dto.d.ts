export declare class UserDto {
    id: string;
    name: string;
    email: string;
    phone?: string;
    birthDate?: string;
    address?: string;
    city?: string;
    country: string;
    company?: string;
    position?: string;
    avatarUrl?: string;
    passwordHash?: string;
    googleId?: string;
    emailVerified: boolean;
    isActive: boolean;
    preferredContactMethod: string;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    phone?: string;
    birthDate?: string;
    address?: string;
    city?: string;
    country: string;
    company?: string;
    position?: string;
    avatarUrl?: string;
    passwordHash?: string;
    googleId?: string;
    emailVerified: boolean;
    isActive: boolean;
    preferredContactMethod: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    address?: string;
    city?: string;
    country?: string;
    company?: string;
    position?: string;
    avatarUrl?: string;
    passwordHash?: string;
    googleId?: string;
    emailVerified?: boolean;
    isActive?: boolean;
    preferredContactMethod?: string;
    lastLogin?: string;
}
export declare class UserFilterDto {
    search?: string;
    city?: string;
    country?: string;
    isActive?: boolean;
    emailVerified?: boolean;
    sortBy?: string;
    sortOrder?: string;
}
