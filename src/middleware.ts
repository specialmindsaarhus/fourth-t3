import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});
console.log("middelware running...!!")

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};