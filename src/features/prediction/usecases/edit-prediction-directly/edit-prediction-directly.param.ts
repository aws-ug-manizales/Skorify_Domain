import { Id } from "../../../../core";

export interface EditPredictionDirectlyParam {
  predictionId: Id;
  awayScore: number;
  homeScore: number;
  earnedPoints: number;
  hasExactResult: boolean;
}
