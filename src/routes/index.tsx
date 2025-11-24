import { Loader2 } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const UserOverview = lazy(() => import("@/pages/overview/user_overview"));
const UserSessions = lazy(() => import("@/pages/sessions/user_sessions"));

const AppRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="h-[80dvh] flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<UserOverview />} />
        <Route path="/sessions" element={<UserSessions />} />

        {/* add other app routes here */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
