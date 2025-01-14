import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import IntroPage from "./intro-page";
import { NewDocument } from "./new-document";
import RecentDocument from "./recent-document";
import { Loader } from "lucide-react";

export const Dashboard = () => {
  const { userId } = auth();

  if (!userId) {
    return <IntroPage />;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* New Document */}
      <div className="rounded-lg border-4 border-gray-300 p-6 shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          New Document
        </h2>
        <Suspense
          fallback={<Loader className="flex justify-center animate-spin" />}
        >
          <NewDocument />
        </Suspense>
      </div>

      {/* Recent Document */}
      <div className="rounded-lg border-4 border-gray-300 p-6 shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Recent Document
        </h2>
        <Suspense
          fallback={<Loader className="flex justify-center animate-spin" />}
        >
          <RecentDocument />
        </Suspense>
      </div>
    </div>
  );
};
