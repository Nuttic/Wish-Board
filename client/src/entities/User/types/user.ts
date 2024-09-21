export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
   
  } | undefined;
  
  export type UserWithoutId = Omit<User, 'id'>;
  
  // export type UserId = User['id'];