"use server"
import { createSession } from "../../lib/session";
import { getCollection } from "../../lib/db";
import { LoginFormSchema, RegisterFormSchema } from "../../lib/rules";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function register(state, formData) {
  console.log("Received formData:", {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  const validateFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateFields.data;
  const userCollection = await getCollection("users");
console.log(userCollection);
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return { error: { email: ["Email already exists"] } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const results = await userCollection.insertOne({ email, password: hashedPassword });
console.log(results);
await createSession(results.insertedId.toString());  // Convert ObjectId to string

  return redirect("/login"); // 
}
export async function login(state , formData){
const validateFields = LoginFormSchema.safeParse({
  email: formData.get("email"),
  password: formData.get("password"),
})
 if(!validateFields.success){
  return {
    error: validateFields.error.flatten().fieldErrors,
  };
 }
 const { email, password } = validateFields.data;
 const userCollection = await getCollection("users");
 const user = await userCollection.findOne({ email });
 if(!user){
  return { error: { email: ["Email not found"] } };
 }
 const isPasswordMatch = await bcrypt.compare(password, user.password);
 if(!isPasswordMatch){
  return { error: { password: ["Incorrect password"] } };
 }
 await createSession(user._id.toString());
 console.log("User created successfully", user);
 return redirect("/dashboard"); //
}

export async function logout(){
const cookiesStore = await cookies();
cookiesStore.delete("session");
redirect('/')
}