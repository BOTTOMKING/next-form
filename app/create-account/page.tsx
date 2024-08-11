"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const schema = z.object({
  username: z.string().min(5, "Username should be at least 5 characters long"),
  email: z.string().email().refine((val) => val.endsWith("@zod.com"), {
    message: "Only @zod.com emails are allowed",
  }),
  password: z.string().min(10).regex(/\d/, "Password must contain at least one number"),
});

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/create-account", data);
      router.push("/log-in");
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Username</label>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}
