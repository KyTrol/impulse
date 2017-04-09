import { User } from "../user/user.model";

export interface Rating {
    
    _id: string,
    rating: number,
    reviewingUser: User,
    reviewedUser: User,
    review: string
    
}