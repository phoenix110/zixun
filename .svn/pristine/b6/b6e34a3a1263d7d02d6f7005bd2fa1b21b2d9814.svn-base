export interface UserInfo {
  id: string;
  username: string;
  fullName: string;
  password: string;
  email: string;
  phone: string;
  avatarId: string;
  avatarPath: string;
  description: string;
  token: string;
}


export interface LoginInfo {
  access_token: string;//有效期30分钟
  refresh_token: string;//有效期30天,30天后的晚上12点过期.需要重新登录才能获取
  authTime: number;//token认证时间
  user: UserInfo;
}
