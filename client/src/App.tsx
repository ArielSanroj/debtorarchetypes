import { Switch, Route } from "wouter";
import { Layout } from "@/components/Layout";
import DashboardPage from "@/pages/DashboardPage";
import ProfilesPage from "@/pages/ProfilesPage";
import CampaignsPage from "@/pages/CampaignsPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/profiles" component={ProfilesPage} />
        <Route path="/campaigns" component={CampaignsPage} />
        <Route>
          <div className="flex items-center justify-center min-h-[60vh]">
            <h1 className="text-2xl font-bold text-muted-foreground">404 Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
