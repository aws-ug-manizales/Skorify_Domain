import { BuiltEntityDomainEvent, DomainEvent } from "../../core";
import { Entity, Id } from "../../core/entity";

export interface TeamAttributes {
  id: Id;
  name: string;
  tournamentId: Id;
  shieldUrl?: string;
}

export class TeamEntity extends Entity {
  name: string;
  tournamentId: Id;
  shieldUrl?: string;

  private constructor(params: TeamAttributes) {
    super(params.id, new Date());
    this.name = params.name;
    this.shieldUrl = params.shieldUrl;
    this.tournamentId = params.tournamentId;
  }

  static build(params: TeamAttributes): DomainEvent {
    return BuiltEntityDomainEvent(new TeamEntity(params));
  }
}
