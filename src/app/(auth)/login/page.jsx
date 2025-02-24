"use client"
import { login } from '../../actions/auth';
import Link from 'next/link';
import React, { useActionState } from 'react';

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Login</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" required />
          {state?.error?.email && <p className="error">{state.error.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required autoComplete="new-password"/>
         
        </div>


        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>
          <Link href={"/register"} className="text-link">
            OR Register here
          </Link>
        </div>
      </form>
    </div>
  );
}