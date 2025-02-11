type UserStatus =
  | "banned"
  | "new"
  | "trial"
  | "subscribed"
  | "subscription_ended";

type UserLang = "ru" | "eng" | "heb";

export interface User {
  user_id: number;
  username: string;
  status: UserStatus;
  subscribed_until: string;
  registered_at: string;
  first_name: string;
  last_name: string;
  settings: object;
  locale: UserLang;
  balance: number;
  subscription_job_ids: string[];
  current_start_message_schedule: string;
  create_bots_limit: number;
}

export interface UserTelegram {
  is_bot_banned: boolean;
  user_id: number;
  username: string;
  full_name: string;
}
