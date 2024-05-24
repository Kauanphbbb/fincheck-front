import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function Dashboard() {
  const { logout } = useAuth();

  return <Button onClick={logout}>Sair</Button>;
}
