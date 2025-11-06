class IssueTypeEntity {
  public documentStatus: string | null;
  public category: string;
  public type: string;
  public item: string;
  public current: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    category: string,
    type: string,
    item: string,
    current: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.category = category;
    this.type = type;
    this.item = item;
    this.current = current;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default IssueTypeEntity;
