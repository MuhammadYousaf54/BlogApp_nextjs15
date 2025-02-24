"use client"
import { register } from '../../actions/auth';
import Link from 'next/link';
import React, { useActionState } from 'react';

export default function Page() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" required />
          {state?.error?.email && <p className="error">{state.error.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required autoComplete="new-password"/>
          {state?.error?.password && <p className="error">{state.error.password[0]}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" name="confirmPassword" required autoComplete="new-password"/>
          {state?.error?.confirmPassword && (
            <p className="error">{state.error.confirmPassword[0]}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Register"}
          </button>
          <Link href={"/login"} className="text-link">
            OR login here
          </Link>
        </div>
      </form>
    </div>
  );
}