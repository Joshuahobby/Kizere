
import { useLocation } from 'wouter';

export function useNavigation() {
  const [, setLocation] = useLocation();
  
  return {
    navigate: (path: string) => setLocation(path)
  };
}
