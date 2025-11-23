import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { Loader2 } from "lucide-react";

const UserOverview = lazy(() => import("./pages/overview/user_overview"));

export default function App() {
  return (
    <AppLayout>
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
          {/* add other app routes here */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}
