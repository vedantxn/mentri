"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onError: (error) => {
        window.alert("Something went wrong");
      },
      onSuccess: () => {
        window.alert("Success");
      },
    });
  }

  if (session) {
    return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
    );
  }
     
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <Input
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)} />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Sign Up</Button>
    </div>
  );
}