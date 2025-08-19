import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upcoming from "./pages/Upcoming";
import Calendar from "./pages/Calendar";
import Completed from "./pages/Completed";
import NotFound from "./pages/NotFound";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKvV1NAD8y2DeK8EvedCIobe9skx-7Xvc",
  authDomain: "dark-plan-do.firebaseapp.com",
  projectId: "dark-plan-do",
  storageBucket: "dark-plan-do.firebasestorage.app",
  messagingSenderId: "296918482775",
  appId: "1:296918482775:web:40f02d9c8d6fb569ee8812",
  measurementId: "G-BWGVYXL501",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Set up Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Example sign-in function
export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // User signed in
      const user = result.user;
      console.log("Signed in user:", user);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/completed' element={<Completed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
