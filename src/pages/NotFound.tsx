
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg text-center">
          <AnimatedContainer animation="scale" className="mb-8">
            <BlurContainer className="p-12 md:p-16">
              <h1 className="text-9xl font-bold text-primary/30">404</h1>
              <h2 className="text-3xl font-bold mt-6 mb-4">Page Not Found</h2>
              <p className="text-muted-foreground mb-8">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link to="/">
                <Button size="lg" className="rounded-full">
                  Return Home
                </Button>
              </Link>
            </BlurContainer>
          </AnimatedContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
