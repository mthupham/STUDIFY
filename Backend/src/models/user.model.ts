import {Column, DataType, Model, Table} from "sequelize-typescript";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Table
export class User extends Model<User> {
    @Column({ allowNull: false, unique:true, type: DataType.STRING })
    declare email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare password: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare avatar: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare phone: string;

    @Column({
    allowNull: true,
    type: DataType.STRING,
    field: 'current_level',
    })
    declare currentLevel: string;

    @Column({
        allowNull: true,
        defaultValue: UserRole.USER,
        type: DataType.ENUM(...Object.values(UserRole)),
    })
    declare role: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare provider: string;

    @Column({
        allowNull: true,
        type: DataType.INTEGER,
        field: 'weekly_study_hours',
    })
    declare weeklyStudyHours: number;

    @Column({
        allowNull: false,
        defaultValue: false,
        type: DataType.BOOLEAN,
        field: 'has_completed_onboarding',
    })
    declare hasCompletedOnboarding: boolean;

    @Column({ allowNull: true, type: DataType.STRING, field: 'reset_otp' })
    declare resetOtp: string | null;

    @Column({ allowNull: true, type: DataType.DATE, field: 'reset_otp_expires' })
    declare resetOtpExpires: Date | null;

    @Column({
        allowNull: false,
        defaultValue: 0,
        type: DataType.INTEGER,
        field: 'failed_login_attempts',
    })
    declare failedLoginAttempts: number;

    @Column({
        allowNull: true,
        type: DataType.DATE,
        field: 'lock_until',
    })
    declare lockUntil: Date | null;

    


    toJSON() {
        const values = { ...this.get() } as Record<string, unknown>;
        delete values.password;
        delete values.resetOtp;
        delete values.resetOtpExpires;
        return values;
    }
}