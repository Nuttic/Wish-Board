export type Wish = {
  id: number;
  title: string;
  description: string;
  deadLine: Date;
  status: boolean;
  userId: number;
};

export type WishWithoutId = Omit<Wish, 'id'>;

export type WishId = Wish['id'];
