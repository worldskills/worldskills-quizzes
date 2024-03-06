import { WsEntityModel } from "@worldskills/worldskills-angular-lib";

export interface Member {
  id: number;
  ws_entity: WsEntityModel
}

export interface MemberList {
  members: Member[];
}
