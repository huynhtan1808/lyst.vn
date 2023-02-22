SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


DROP POLICY IF EXISTS "Enable access to all users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP INDEX IF EXISTS public.users_id_index;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
DROP TABLE IF EXISTS public.users;

-- Name: users; Type: TABLE; Schema: public; Owner: supabase_admin

CREATE TABLE public.users (
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    email character varying,
    aud character varying,
    role character varying,
    "authRole" character varying DEFAULT 'user'::character varying NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    username text,
    bio text,
    "avatarUrl" text,
    name character varying,
    "bannerUrl" text
);


ALTER TABLE public.users OWNER TO supabase_admin;



--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin


  insert into public.users (
    id, 
    email, 
    created_at, 
    updated_at, 
    aud, 
    role, 
    username,
    "avatarUrl",
    name
  )
  values (
    new.id, 
    new.email, 
    new.created_at, 
    new.updated_at, 
    new.aud, 
    new.role, 
    regexp_replace(CONCAT(split_part(new.email, '@', 1), floor(random() * (99999 - 10000 + 1) + 10000)), '[^\w]+',''),
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_user_meta_data ->> 'name'
  )
    on conflict (id) do 
    update set (
      id, 
      email, 
      created_at, 
      updated_at, 
      aud, 
      role
    ) = (
      new.id, 
      new.email, 
      new.created_at, 
      new.updated_at, 
      new.aud, 
      new.role
    );
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "supabase_admin";


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);

CREATE INDEX users_id_index ON public.users USING btree (id);

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE POLICY "Enable access to all users" ON public.users FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on email" ON public.users FOR UPDATE USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: TABLE; Schema: public; Owner: supabase_admin
--
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_new_user();



GRANT ALL ON TABLE public.users TO postgres;
GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;