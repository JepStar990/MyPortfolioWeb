import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectDetails from "@/pages/ProjectDetails";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects/:id" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
