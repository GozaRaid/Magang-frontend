import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Loading...
        </h2>
        <p className="mt-2 text-muted-foreground">
          Please wait while we fetch your data.
        </p>
      </div>
    </div>
  );
}
