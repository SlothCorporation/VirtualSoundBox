import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useEffect } from "react";
import { apiFetch } from "@/lib/api";

export const useInitAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
        console.error(e);
      }
    };
    if (!user) {
      checkAuth();
    }
  }, [user, setUser]);
};
