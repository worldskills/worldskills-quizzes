import { I18nText, WsEntityModel } from "@worldskills/worldskills-angular-lib";

export interface Member {
  id: number;
  name: I18nText
  ws_entity: WsEntityModel
}

export interface MemberList {
  members: Member[];
}
