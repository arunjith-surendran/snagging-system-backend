class IssueTypeEntity {
  public category: string;
  public type: string;
  public item: string;
  public current: boolean;
  public createdUser: string | null;

  constructor(
    category: string,
    type: string,
    item: string,
    current: boolean,
    createdUser: string | null,
  ) {
    this.category = category;
    this.type = type;
    this.item = item;
    this.current = current;
    this.createdUser = createdUser;
  }
}

export default IssueTypeEntity;
