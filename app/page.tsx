import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Overview = async () => {
  const {userId} = auth();
  if(!userId) {
    redirect("/sign-in");
  }
  return (
    <div className=' flex gap-x-5'>
      Hi from Overview
    </div>
  )
}

export default Overview