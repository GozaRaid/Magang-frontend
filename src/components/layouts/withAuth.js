import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/features/auth/AuthContext";

export function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const { isLoggedIn, checkAuthStatus } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        await checkAuthStatus();
        setLoading(false); // Set loading to false only after checking auth
      };
      checkAuth();
    }, []);

    useEffect(() => {
      // Ensure that it redirects only when loading is false and user is not logged in
      if (!loading && !isLoggedIn) {
        router.push("/");
      }
    }, [isLoggedIn, loading, router]); // Add loading as a dependency to avoid premature redirect

    if (loading) {
      return null; // Display nothing or a loading spinner while checking auth status
    }

    return <Component {...props} />;
  };
}
