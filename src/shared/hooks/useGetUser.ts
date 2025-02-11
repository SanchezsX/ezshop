import { useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/UserService.ts";

export const useGetUser = (data: { botId: number; userId: number }) => {
  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await UserService.getTgInfo({
        botId: data.botId,
        userId: data.userId,
      });
      return res.data;
    },
  });

  return { userData, userIsLoading };
};
