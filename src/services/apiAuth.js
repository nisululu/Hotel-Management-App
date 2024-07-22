import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return user;
}

export async function userLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function userSignin({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  let avatarName,
    avatarPath = "",
    updatedData = { data: { fullName } };

  if (avatar) {
    avatarName = `${Math.random()}-${avatar.name}`;

    avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
    updatedData.data.avatar = avatarPath;
  }

  if (password) updatedData = { password };

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  //upload avatar
  if (avatar) {
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar, {
        upsert: true,
      });
    if (storageError) throw new Error(error.message);
  }

  return data;
}
