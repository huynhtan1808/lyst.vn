import { createServerClient } from '../../../lib/supabase-server';


// this component fetches the current posts server-side
// and subscribes to new posts client-side
export default async function Profile() {
  // data can be passed from server components to client components
  // this allows us to fetch the initial posts before rendering the page
  // our <RealtimePosts /> component will then subscribe to new posts client-side
  return (
    <>
      <div>HAHAHAHA</div>
    </>
  );
}