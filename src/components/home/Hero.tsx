
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-accent/30 to-background flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-[30%] -left-28 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-[20%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <AnimatedContainer animation="slide-up" className="flex flex-col space-y-6">
            <div className="space-y-2">
              <AnimatedContainer animation="fade" delay={300} className="inline-block">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Technical Support Made Simple
                </span>
              </AnimatedContainer>
              <AnimatedContainer animation="slide-up" delay={500}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Expert Technical<br />
                  <span className="text-primary">Support</span> At Your Fingertips
                </h1>
              </AnimatedContainer>
              <AnimatedContainer animation="slide-up" delay={700}>
                <p className="text-lg text-muted-foreground max-w-xl mt-4">
                  Connect with skilled technicians instantly, schedule services, and get the support you need, when you need it. One platform to solve all your technical problems.
                </p>
              </AnimatedContainer>
            </div>

            <AnimatedContainer animation="fade" delay={900} className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="rounded-full text-base">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full text-base">
                  Browse Services
                </Button>
              </Link>
            </AnimatedContainer>

            <AnimatedContainer animation="fade" delay={1100}>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> technicians ready to help
                </p>
              </div>
            </AnimatedContainer>
          </AnimatedContainer>

          {/* Hero Image */}
          <AnimatedContainer animation="slide-left" delay={700} className="relative">
            <BlurContainer className="p-1 md:p-2 overflow-hidden rounded-2xl" intensity="light">
              <div className="rounded-xl overflow-hidden bg-gradient-to-tr from-primary/5 to-primary/20 relative">
                <div className="aspect-[4/3] relative">
                  {/* Placeholder for real image - replace this with your actual image */}
                  <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="text-6xl text-primary/20">
                      {/* Insert an actual image here */}
                      <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                        <span className="text-primary/60">Technical Support Illustration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurContainer>

            {/* Floating card elements */}
            <BlurContainer className="absolute -top-8 -right-4 md:right-8 shadow-lg p-4 max-w-[200px]" intensity="medium">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Instant Support</h3>
                  <p className="text-xs text-muted-foreground mt-1">Connect with experts in minutes</p>
                </div>
              </div>
            </BlurContainer>

            <BlurContainer className="absolute -bottom-6 -left-6 md:left-12 shadow-lg p-4 max-w-[220px]" intensity="medium">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Trusted Experts</h3>
                  <p className="text-xs text-muted-foreground mt-1">Verified technicians with top ratings</p>
                </div>
              </div>
            </BlurContainer>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Hero;
