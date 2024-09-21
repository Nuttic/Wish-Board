import { createContext, Dispatch, SetStateAction } from 'react';
import type { Wish } from '../../entities/Wish/types/wish';
import { User } from '../../entities/User/types/user';

// const [user, setUser] = useState<User | undefined>(undefined)

type InitialState = {
  wishes: Wish[];
  setWishes: Dispatch<SetStateAction<Wish[]>>;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;

};

export const initialState: InitialState = {
  wishes: [],
  user: undefined,
  setWishes: () => {},
  setUser: () => {}
};

export const AppContext = createContext(initialState);


