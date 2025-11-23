import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const UserOverview = lazy(() => import("@/pages/overview/user_overview"));
const UserSessions = lazy(() => import("@/pages/sessions/user_sessions"));

const AppRoutes = () => {
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
