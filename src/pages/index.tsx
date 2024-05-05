import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";



export default function Home() {
  const user = useUser()
  /*
  const hello = api.post.postList.useQuery();
  console.log(hello)
  */
  const {data} = api.post.getAll.useQuery();
  console.log(data)
  
  return (
    <>
      <Head>
        <title>Creating T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-transparent absolute w-screen flex">
          {
            !!user.isSignedIn &&
              <>
                <div className="text-white ms-2 me-auto my-2">
                  <span> Velkommen {user.user.username}
                  </span>
                </div>
                <div className="me-2 ms-auto my-2 text-white">
                  <SignOutButton />
                </div>
              </>
          } 
          {!user.isSignedIn && 
            <div className="me-2 ms-auto my-2 text-white">
              <SignInButton />
            </div>
          }
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="text-white flex-row flex w-full justify-center space-x-12">
          {
            data?.map((item)=>{
              return <div key={item.id} className="flex flex-col justify-center">
                  <p  className="my-2">{item.name}</p>
                  <span  className="text-center">
                    {item.content}
                  </span>
              </div>
            })
          }
        </div>
      </main>
    </>
  );
}
