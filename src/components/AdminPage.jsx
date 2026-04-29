import { useEffect, useMemo, useState } from "react";
import supabase from "../lid/supabase";

function formatTime(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function AdminPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("login_logs")
      .select("username, real_name, ip, device, time, status")
      .order("time", { ascending: false });

    if (fetchError) {
      setLogs([]);
      setError("Failed to load login activity.");
      setLoading(false);
      return;
    }

    setLogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const stats = useMemo(() => {
    const usernames = new Set();
    const ips = new Set();
    const devices = new Set();

    logs.forEach((log) => {
      if (log.username) {
        usernames.add(log.username);
      }
      if (log.ip) {
        ips.add(log.ip);
      }
      if (log.device) {
        devices.add(log.device);
      }
    });

    return {
      totalLogins: logs.length,
      uniqueUsers: usernames.size,
      uniqueIps: ips.size,
      uniqueDevices: devices.size,
    };
  }, [logs]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#0095f6]">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Login activity dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">View login activity collected from the existing Supabase log table.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchLogs}
              disabled={loading}
              className="rounded-full bg-[#0095f6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0084e0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <a
              href="/"
              className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              Back to login
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total logins</p>
            <p className="mt-3 text-3xl font-semibold text-[#1f2937]">{stats.totalLogins}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unique usernames</p>
            <p className="mt-3 text-3xl font-semibold text-[#1f2937]">{stats.uniqueUsers}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unique IPs</p>
            <p className="mt-3 text-3xl font-semibold text-[#1f2937]">{stats.uniqueIps}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unique devices</p>
            <p className="mt-3 text-3xl font-semibold text-[#1f2937]">{stats.uniqueDevices}</p>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[#1f2937]">Recent activity</h2>
              <p className="mt-1 text-sm text-gray-500">Username, Password, status, time, IP address, and device are shown here.</p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {!error && loading && (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-12 text-center text-sm text-gray-500">
              Loading login activity...
            </div>
          )}

          {!error && !loading && logs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-12 text-center text-sm text-gray-500">
              No login activity found yet.
            </div>
          )}

          {!error && !loading && logs.length > 0 && (
            <div className="overflow-hidden rounded-3xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Username</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">password</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">IP</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Device</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {logs.map((log, index) => (
                      <tr key={`${log.username ?? "unknown"}-${log.time ?? index}-${index}`}>
                        <td className="px-4 py-4 text-sm font-medium text-[#1f2937]">{log.username || "—"}</td>
                        <td className="max-w-md px-4 py-4 text-sm text-gray-600">
                          <p className="break-all">{log.real_name || "—"}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          <span className="inline-flex rounded-full bg-[#e8f3ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0b6bcb]">
                            {log.status || "unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{formatTime(log.time)}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{log.ip || "—"}</td>
                        <td className="max-w-md px-4 py-4 text-sm text-gray-600">
                          <p className="line-clamp-2 break-all">{log.device || "—"}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
