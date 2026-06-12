export type Score = {
  awayScore: number;
  homeScore: number;
};

export type MatchOutcome = -1 | 0 | 1;

export function goalDiff(score: Score): number {
  return score.awayScore - score.homeScore;
}

export function outcome(score: Score): MatchOutcome {
  const diff = goalDiff(score);
  if (diff === 0) return 0;
  return diff > 0 ? 1 : -1;
}

export function isSameOutcome(a: Score, b: Score): boolean {
  return outcome(a) === outcome(b);
}

export function isExactScore(a: Score, b: Score): boolean {
  return a.awayScore === b.awayScore && a.homeScore === b.homeScore;
}

export function isInverseOutcome(a: Score, b: Score): boolean {
  const isDrawA = a.homeScore === a.awayScore;
  const isDrawB = b.homeScore === b.awayScore;

  return (
    !isDrawA &&
    !isDrawB &&
    a.homeScore === b.awayScore &&
    a.awayScore === b.homeScore
  );
}
export function totalGoals(score: Score): number {
  return score.awayScore + score.homeScore;
}
