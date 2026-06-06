import { PredictionScoreRuleset } from "../prediction/scoreRules/prediction-score.ruleset";
import { streakBonusRules } from "./user-enrollment.entity";

export type TimelineScore = {
  awayScore: number;
  homeScore: number;
};

export interface TimelineEntry {
  prediction: TimelineScore | null;
  match: TimelineScore;
}

export interface ScoredPrediction {
  base: number;
  bonus: number;
  earned: number;
  isExact: boolean;
}

export interface EnrollmentScore {
  perEntry: ScoredPrediction[];
  total: number;
  streak: number;
  maxStreak: number;
}

export function scoreEnrollmentTimeline(entries: TimelineEntry[]): EnrollmentScore {
  const ruleset = PredictionScoreRuleset.default();
  let streak = 0;
  let maxStreak = 0;
  let total = 0;

  const perEntry = entries.map(({ prediction, match }) => {
    if (!prediction) {
      streak = 0;
      return { base: 0, bonus: 0, earned: 0, isExact: false };
    }

    const { total: base } = ruleset.calculateWithBreakdown({ prediction, match });
    const isExact =
      prediction.awayScore === match.awayScore &&
      prediction.homeScore === match.homeScore;
    const bonus = isExact ? streakBonusRules.get(streak) ?? 0 : 0;

    if (isExact) {
      streak += 1;
      if (streak > maxStreak) maxStreak = streak;
    } else {
      streak = 0;
    }

    const earned = base + bonus;
    total += earned;
    return { base, bonus, earned, isExact };
  });

  return { perEntry, total, streak, maxStreak };
}
