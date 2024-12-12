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
        <Route>404 Page Not Found</Route>
      </Switch>
    </Layout>
  );
}

export default App;
