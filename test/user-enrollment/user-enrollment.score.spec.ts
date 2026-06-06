import {
  scoreEnrollmentTimeline,
  TimelineEntry,
} from "../../src/features/user-enrollment/user-enrollment.score";

// 2-0 hit (home 2, away 0): WinnerDraw(2) + TeamGoals(1) + ExactScore(1) = 4 base.
const exact2to0: TimelineEntry = {
  prediction: { awayScore: 0, homeScore: 2 },
  match: { awayScore: 0, homeScore: 2 },
};

// predicted 2-0, real 1-0: same winner (2) + away goals match (1) = 3 base, not exact.
const close2to0: TimelineEntry = {
  prediction: { awayScore: 0, homeScore: 2 },
  match: { awayScore: 0, homeScore: 1 },
};

// did not predict a calculated match -> breaks the streak, contributes nothing.
const missing: TimelineEntry = {
  prediction: null,
  match: { awayScore: 0, homeScore: 2 },
};

describe("scoreEnrollmentTimeline", () => {
  it("returns a zeroed score for an empty timeline", () => {
    expect(scoreEnrollmentTimeline([])).toEqual({
      perEntry: [],
      total: 0,
      streak: 0,
      maxStreak: 0,
    });
  });

  it("scores a single exact prediction with its base rules and no bonus yet", () => {
    const result = scoreEnrollmentTimeline([exact2to0]);

    expect(result.perEntry[0]).toEqual({ base: 4, bonus: 0, earned: 4, isExact: true });
    expect(result.total).toBe(4);
    expect(result.streak).toBe(1);
    expect(result.maxStreak).toBe(1);
  });

  it("scores a non-exact prediction with partial points and resets the streak", () => {
    const result = scoreEnrollmentTimeline([exact2to0, close2to0]);

    expect(result.perEntry[1]).toEqual({ base: 3, bonus: 0, earned: 3, isExact: false });
    expect(result.streak).toBe(0);
    expect(result.total).toBe(7);
  });

  it("awards the streak bonus on the 4th consecutive exact (prior streak 3 -> +1)", () => {
    const result = scoreEnrollmentTimeline(Array(4).fill(exact2to0));

    expect(result.perEntry.map((e) => e.bonus)).toEqual([0, 0, 0, 1]);
    expect(result.perEntry[3].earned).toBe(5); // base 4 + bonus 1
    expect(result.total).toBe(17); // 4 + 4 + 4 + 5
    expect(result.streak).toBe(4);
    expect(result.maxStreak).toBe(4);
  });

  it("treats an unpredicted calculated match as a streak break worth zero points", () => {
    const result = scoreEnrollmentTimeline([exact2to0, missing, exact2to0]);

    expect(result.perEntry[1]).toEqual({ base: 0, bonus: 0, earned: 0, isExact: false });
    expect(result.total).toBe(8);
    expect(result.streak).toBe(1);
    expect(result.maxStreak).toBe(1);
  });

  it("keeps current_score auditable: total always equals the sum of per-prediction earned points", () => {
    const timeline = [exact2to0, close2to0, exact2to0, exact2to0, missing, exact2to0];
    const result = scoreEnrollmentTimeline(timeline);

    const sum = result.perEntry.reduce((acc, e) => acc + e.earned, 0);
    expect(result.total).toBe(sum);
  });

  it("is deterministic: same timeline always yields the same result", () => {
    const timeline = [exact2to0, missing, exact2to0, close2to0];
    expect(scoreEnrollmentTimeline(timeline)).toEqual(scoreEnrollmentTimeline(timeline));
  });
});
