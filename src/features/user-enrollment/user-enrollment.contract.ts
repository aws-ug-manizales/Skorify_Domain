import { BaseContract } from "../../core";
import { UserEnrollmentEntity } from "./user-enrollment.entity";

export abstract class UserEnrollmentContract extends BaseContract<UserEnrollmentEntity> {
  abstract recomputeEnrollment(enrollmentId: string): Promise<void>;

  abstract scorePrediction(
    predictionId: string,
    matchAwayScore: number,
    matchHomeScore: number,
  ): Promise<{ earned: number; skipped: boolean }>;

  abstract resetStreakForMatch(
    enrollmentId: string,
    matchId: string,
  ): Promise<void>;
}
