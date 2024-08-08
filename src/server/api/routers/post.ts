import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = clerkClient.users.getUserList({
      userId: posts.map((post) => post.autherId),
      limit: 100,
    });

    //console.log("users from clerk: ");
    console.log("user from clerk: ", users);

    return posts;
  }),
});
