import {Column, DataType, Model, Table} from "sequelize-typescript";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Table
export class User extends Model<User> {
    @Column({
        allowNull: false, 
        unique:true,
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    declare avatar: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    declare phone: string;

    @Column({
        allowNull: true,
        defaultValue: UserRole.USER,
        type: DataType.ENUM(...Object.values(UserRole)),
    })
    role: string = UserRole.USER;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    declare provider: string;

    

    
}