'use client'

import { useState } from 'react';
import createServerComponentSupabaseClient from "@/lib/supabase-server";

type Props = {};


async function editProfile({}: Props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const supabaseClient = createServerComponentSupabaseClient();

  
    async function handleSubmit(event) {
      event.preventDefault();
  
      const { data, error } = await supabaseClient
        .from('users')
        .insert({ first_name: firstName, last_name: lastName, user_id: supabaseClient.auth.user().id });
  
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        // Data was successfully inserted
      }
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <button type="submit">Save Additional User Data</button>
        </form>
      );
    }

    export default editProfile;