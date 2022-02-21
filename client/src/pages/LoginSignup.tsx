import { Card, CardContent, Grid } from "@mui/material";
import { SupabaseClient } from "@supabase/supabase-js";
import { Auth, Button, Typography } from "@supabase/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { useSupabase } from "../components/SupabaseContext";

const { Text } = Typography;

interface AuthContainerProps {
  children?: JSX.Element[] | JSX.Element;
  supabaseClient: SupabaseClient;
}

interface LoginSignupProps {
}

const AuthContainer = (props: AuthContainerProps) => {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  if (user) {
    navigate('/');
  }
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
  const supabaseClient = useSupabase();

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
            <AuthContainer supabaseClient={supabaseClient}>
              <Auth supabaseClient={supabaseClient} view={view as ViewType} />
            </AuthContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
