import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import KnowledgeHub from "@/pages/KnowledgeHub";
import Documents from "@/pages/Documents";
import Directory from "@/pages/Directory";
import ProfileDetails from "@/pages/ProfileDetails";
import Profile2 from "@/pages/Profile2";
import AppShell from "@/components/AppShell";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [location] = useLocation();
  const hideShellPaths = ["/login", "/signup", "/landing"];
  const hideAppShell = hideShellPaths.includes(location);

  const Routes = (
    <Switch>
      {/* Redirect root "/" to "/landing" */}
      <Route path="/" component={() => {
        window.location.replace("/landing");
        return null;
      }} />

      {/* Public Pages */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/landing" component={LandingPage} />

      {/* Protected Pages (with sidebar) */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/knowledge-hub" component={KnowledgeHub} />
      <ProtectedRoute path="/documents" component={Documents} />
      <ProtectedRoute path="/directory" component={Directory} />
      <ProtectedRoute path="/profile" component={ProfileDetails} />
      <ProtectedRoute path="/profile2" component={Profile2} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        {hideAppShell ? Routes : <AppShell>{Routes}</AppShell>}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
