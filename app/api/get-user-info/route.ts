import { respData, respErr } from "@/lib/resp";

import { getUserCredits } from "@/services/order";
import { saveUser } from "@/services/user";
import { User } from "@/types/user";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
  const user = await currentUser();
  const user1 = await currentUser();
  const user2 = await currentUser();
  const user3 = await currentUser();
  const user4 = await currentUser();

  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
     console.log("user ===>",user)
    return respErr("not login");
  }

  try {
    const email = user.emailAddresses[0].emailAddress;
    const nickname = user.firstName;
    const avatarUrl = user.imageUrl;
    const userInfo: User = {
      email: email,
      nickname: nickname || "",
      avatar_url: avatarUrl,
    };

    await saveUser(userInfo);

    const user_credits = await getUserCredits(email);
    userInfo.credits = user_credits;

    return respData(userInfo);
  } catch (e) {
    console.log("get user info failed");
    return respErr("get user info failed");
  }
}
