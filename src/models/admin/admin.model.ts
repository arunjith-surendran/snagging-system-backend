export interface IAdmin {
  id: string;
  documentStatus: boolean;
  adminUserName: string;
  adminUserType: string;
  email: string;
  password: string;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
