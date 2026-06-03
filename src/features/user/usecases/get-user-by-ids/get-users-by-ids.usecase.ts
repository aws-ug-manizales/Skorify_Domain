import { Usecase } from "../../../../core/usecase";
import { GetUsersByIdsParam } from "./get-users-by-ids.param";

export abstract class GetUsersByIdsUsecase extends Usecase<GetUsersByIdsParam> {}
