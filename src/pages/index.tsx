import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { GeneratePrimeOptionsArrayBuffer } from "crypto";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex">
      <img
        src={user.profileImageUrl}
        alt="ProfileImage"
        className="h-14 w-14 rounded-full"
      />
    </div>
  );
};

export default function Home(props) {
  const user = useUser();

  const { data } = api.post.getAll.useQuery();
  console.log(data);

  return (
    <>
      <Head>
        <title>Creating T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen justify-center">
        <div className="w-full  border-slate-400 md:max-w-2xl">
          <nav className="mb-4 flex border-slate-400 py-4">
            {!user.isSignedIn && (
              <div className="my-2 me-2 ms-auto ">
                <SignInButton />
              </div>
            )}
            {!!user.isSignedIn && (
              <>
                <div className="my-2 me-auto ms-2">
                  <CreatePostWizard />
                </div>
                <div className="my-2 me-2 ms-auto flex justify-center rounded-lg border border-slate-400 bg-slate-900 px-6 py-2">
                  <SignOutButton />
                </div>
              </>
            )}
          </nav>
          <div className="w-full">
            <h3 className=" p-8 pl-0 text-sm uppercase tracking-wide text-slate-200">
              Development Branch
            </h3>
            {data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border-slate-400S mb-6 flex rounded-md bg-slate-800 p-8"
                >
                  <span className="text-center">{item.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
