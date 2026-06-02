import { Id } from "../../../../core/entity";
import { MatchType } from "../../tournament.entity";

export interface CreateTournamentParam {
  name: string;
  matchType: MatchType;
  startDate: Date;
  endDate: Date;
  userId: Id;
}
