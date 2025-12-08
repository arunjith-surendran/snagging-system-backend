class IssueTypeEntity {
  public id: string | null;
  public category: string;
  public type: string;
  public item: string;
  public current: boolean;

  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    category: string,
    type: string,
    item: string,
    current: boolean,
    createdUser: string | null,
    createdAt: Date | null = new Date(),
    updatedUser: string | null = createdUser,
    updatedAt: Date | null = new Date(),
    id: string | null = null
  ) {
    this.id = id;
    this.category = category.trim();
    this.type = type.trim();
    this.item = item.trim();
    this.current = current;

    this.createdUser = createdUser;
    this.createdAt = createdAt;

    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default IssueTypeEntity;
