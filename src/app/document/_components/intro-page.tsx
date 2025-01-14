import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import Squares from "@/components/ui/squares";

export default function IntroPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 sm:py-24 lg:py-32 bg-black h-[80vh]">
          <div className="absolute inset-0">
            <Squares />{" "}
            
          </div>
          <div className="container px-4 md:px-6 relative z-10 flex items-center justify-center h-full text-center text-white">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-7xl xl:text-6xl pl-4">
                Unlock your Writing Potential 🪶
              </h1>
              {/* Animated Text using CSS */}
              <div className="flex items-center justify-center">
                <p className="max-w-[600px] text-muted-foreground md:text-xl flex justify-center items-center text-center">
                  <span className="split-text text-gray-400">
                    Discover how our cutting-edge products and services can
                    transform your writing with the power of AI.
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <SignInButton> Get Started</SignInButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 sm:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold">AI-Powered Writing</h3>
                <p className="mt-2 text-muted-foreground">
                  Leverage the power of AI to help you craft compelling content
                  effortlessly. Improve your writing with smart suggestions and
                  feedback.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold">Rich Text Editor</h3>
                <p className="mt-2 text-muted-foreground">
                  Our rich text editor offers an intuitive interface for writing
                  and formatting your documents, making it easy for you to focus
                  on your content.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold">Secure Authentication</h3>
                <p className="mt-2 text-muted-foreground">
                  With robust, JWT-based authentication, your data is secure,
                  and you can easily sign in using popular identity providers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 sm:py-24 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
            <p className="max-w-[800px] text-muted-foreground mx-auto text-xl">
              Our mission is to empower writers, students, and professionals
              alike by providing tools that enhance creativity and productivity.
              With AI-driven writing assistance and a seamless editing
              experience, we help you unlock your full writing potential.
            </p>
            <div className="text-center mt-6 text-sm text-gray-500">
              <p>Made by Darshan Choudhary</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
