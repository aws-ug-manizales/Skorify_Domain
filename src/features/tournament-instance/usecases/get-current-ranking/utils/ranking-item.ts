import { Id } from "../../../../../core";

export interface RankingItem {
  userId: Id;
  userName: string;
  currentPosition: number;
  lastPosition: number;
  score: number;
  points: number;
  maxStreak: number;
  streak: number;
}