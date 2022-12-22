import { Container, Brand, Search, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

export function Header({ children }) {
  const { signOut, user } = useAuth();

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  return (
    <Container>
      <Brand>
        <h1>RocketMovies</h1>
      </Brand>

      <Search>{children}</Search>

      <Profile>
        <div>
          <strong>{user.name}</strong>
          <Logout onClick={signOut}>sair</Logout>
        </div>
        <Link to="/profile">
          <img src={avatarURL} alt={user.name} />
        </Link>
      </Profile>
    </Container>
  );
}
