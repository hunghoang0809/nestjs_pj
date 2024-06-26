import { DataSource } from "typeorm"
import { User } from "./entities/User"

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],

    }
] 