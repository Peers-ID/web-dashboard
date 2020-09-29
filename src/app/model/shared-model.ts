export class PillsGroup {
  buttonsGroupName: string;
  background?: string;
  buttonsList: Array<{
    text: string,
    key: string,
    showIf: boolean,
    manipulation?: any
  }>;
  combineable?: boolean;
  key?: string; // required if manipulating filter
  type?: string;
}

export class AdminNotification {
  type: string;
  body: string;
  head?: string;
}
