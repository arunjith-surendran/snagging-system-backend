export interface IToken {
  id: string;
  documentStatus: boolean;
  token: string;
  userId: string; // Linked to user table
  type: "access" | "refresh";
  expires: Date;
  blacklisted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
