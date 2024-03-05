import { User } from './User'

export interface Patient extends User {
    responsibleId: string | undefined
}