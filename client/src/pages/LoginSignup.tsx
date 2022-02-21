import { Card, CardContent, Grid } from "@mui/material";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Auth, Button, Typography } from "@supabase/ui";
import { useLocation } from "react-router-dom";

const { Text } = Typography;

// Create a single supabase client for interacting with your database
const supabase = createClient("https://xyzcompany.supabase.co", "public-anon-key");

interface AuthContainerProps {
  children?: JSX.Element[] | JSX.Element;
  supabaseClient: SupabaseClient;
}

interface LoginSignupProps {
}

const AuthContainer = (props: AuthContainerProps) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return <>{props.children}</>;
};

type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'magic_link'
  | 'update_password';

export function LoginSignup(props: LoginSignupProps) {
  const location = useLocation();

  const hashView = location.hash.slice(1);
  const view = {
    signin: 'sign_in',
    signup: 'sign_up'
  }[hashView] || 'sign_in';

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='center'
      height='75vh'
    >
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Card>
          <CardContent >
            <AuthContainer supabaseClient={supabase}>
              <Auth supabaseClient={supabase} view={view as ViewType} />
            </AuthContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
