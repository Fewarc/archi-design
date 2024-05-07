import { api } from "@/utils/api";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  children: ReactNode;
}

type UserContextType = {
  user?: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const ContextProvider: React.FC<ContextProps> = ({ children }) => {
  const { data } = useSession();
  const [user, setUser] = useState<User | undefined>();

  const { data: userData } = api.user.find.useQuery({
    email: data?.user.email || undefined,
  });

  useEffect(() => {
    if (!user && !!data?.user && !!userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
