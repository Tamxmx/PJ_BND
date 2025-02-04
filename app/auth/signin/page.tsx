"use client";
import { signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    },
    [email, password, router]
  );

  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous error message

    const result = await signIn("google", {
      redirect: false, // Don't redirect immediately
    });

    setLoading(false);

    if (result?.error) {
      setError("Google login failed! Please try again.");
    } else {
      // Redirect after successful Google login
    }
  }, [router]);

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>

      {/* Error message display */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Credentials form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full p-2 border rounded-md text-base font-medium "
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full p-2 border rounded-md text-base font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        
      </form>
      <div className="flex divider text-sm font-bold justify-center items-center mt-2 text-gray-400">or</div>
      {/* Google SignIn button */}
      <div className="mt-2 text-center">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full p-2 bg-gray-500 text-white rounded-md"
        >
          <i className="fa-brands fa-google mr-3"></i>
          {loading ? "Google..." : "Google"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
