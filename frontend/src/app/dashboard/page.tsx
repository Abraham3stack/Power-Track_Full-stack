"use client";

import { useEffect, useState } from "react";
import BalanceCard from "@/components/BalanceCard";
import { getBalance, initializeUnits } from "@/lib/api";
import PredictionCard from "@/components/PredictionCard";
import { getPrediction } from "@/lib/api";
import AlertBanner from "@/components/AlertBanner";
import{ getAlert } from "@/lib/api";
import UsageInput from "@/components/UsageInput";
import { logUsage } from "@/lib/api";
import UsageChart from "@/components/UsageChart";
import { getUsageHistory } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [costPerUnit, setCostPerUnit] = useState<number>(0);

  useEffect(() => {
    const storedToken = getToken();

    if (!storedToken) {
      router.replace("/login");
      return;
    }

    setToken(storedToken);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "User");
      } catch {
        setUserName("User");
      }
    } else {
      setUserName("User");
    }

    const savedCost = localStorage.getItem("costPerUnit");
    if (savedCost) setCostPerUnit(Number(savedCost));

    setIsCheckingAuth(false);
  }, [router]);

  const [balance, setBalance] = useState(0);
  const [initialUnits, setInitialUnits] = useState("");
  const [initLoading, setInitLoading] = useState(false);

  // Handler for initializing units
  const handleInitializeUnits = async () => {
    if (!token || initLoading) return;

    const units = Number(initialUnits);

    if (!units || units <= 0) {
      setToast({ message: "Enter valid units", type: "error" });
      return;
    }

    try {
      setInitLoading(true);

      await initializeUnits(token, units);

      const [balanceData, predictionData, alertData, historyData] = await Promise.all([
        getBalance(token),
        getPrediction(token),
        getAlert(token),
        getUsageHistory(token),
      ]);

      setBalance(balanceData.data.remaining);
      localStorage.setItem("balance", String(balanceData.data.remaining));
      setPrediction(predictionData.data);
      setAlert(alertData.data.alert);
      setHistory(historyData.data);

      setToast({ message: "Units initialized successfully", type: "success" });
      setInitialUnits("");
    } catch (error: any) {
      setToast({ message: error?.message || "Failed to initialize units", type: "error" });
    } finally {
      setInitLoading(false);
    }
  };

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) return;

      try {
        const [balanceData, predictionData, alertData, historyData] = await Promise.all([
          getBalance(token),
          getPrediction(token),
          getAlert(token),
          getUsageHistory(token),
        ]);

        setBalance(balanceData.data.remaining);
        localStorage.setItem("balance", String(balanceData.data.remaining));
        setPrediction(predictionData.data);
        setAlert(alertData.data.alert);
        setHistory(historyData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, [token]);

  // Prediction function
  const [prediction, setPrediction] = useState({
    avgPerDay: 0,
    estimatedDaysLeft: 0,
  });

  // Alert function
  const [alert, setAlert] = useState("");

  // HandleUsageSubmit Function
  const handleUsageSubmit = async (units: number) => {
    if (!token) return;
    try {
      await logUsage(token, units);

      const [balanceData, predictionData, alertData, historyData] = await Promise.all([
        getBalance(token),
        getPrediction(token),
        getAlert(token),
        getUsageHistory(token),
      ]);

      setBalance(balanceData.data.remaining);
      localStorage.setItem("balance", String(balanceData.data.remaining));

      // Fix: ensure avg shows on first entry
      const pred = predictionData.data;
      if (pred.avgPerDay === 0 && units > 0) {
        pred.avgPerDay = units;
      }

      setPrediction(pred);
      setAlert(alertData.data.alert);
      setHistory(historyData.data);

      setToast({ message: "Usage logged successfully", type: "success" });
    } catch (error: any) {
      setToast({
        message: error?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  // UsageHistory function
  const [history, setHistory] = useState<{ date: string; unitsUsed: number }[]>([]);

  const totalUnitsUsed = history.reduce((acc, item) => acc + item.unitsUsed, 0);
  const estimatedCost = totalUnitsUsed * costPerUnit;

  if (isCheckingAuth) return null;

return (
    <div className="min-h-screen bg-dark text-white p-4 md:p-6 pt-8 md:pt-10 space-y-2">
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
          toast.type === "success" ? "bg-success text-white" : "bg-danger text-white"
        }`}>
          {toast.message}
        </div>
      )}
      
      <AlertBanner message={alert} />

      <div className="mb-4 mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center">Actions</h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          Manage electricity units and monitor estimated spending.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
        <div className="bg-card p-6 rounded-2xl border border-gray-700 w-full md:max-w-none transition duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.08)] hover:-translate-y-1">
          <h2 className="text-gray-400 text-sm mb-3">
            {balance === 0 ? "Set Initial Units (kWh)" : "Add Units (kWh)"}
          </h2>

          <input
            type="number"
            placeholder={
              balance === 0
                ? "Enter your current electricity units (e.g. 120)"
                : "Add more units (e.g. 50)"
            }
            value={initialUnits}
            onChange={(e) => setInitialUnits(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-dark border border-gray-600 text-white mb-3 focus:outline-none focus:border-yellow-400 transition"
          />

          <button
            onClick={handleInitializeUnits}
            disabled={!initialUnits || initLoading}
            className={`w-full font-bold py-3 rounded-xl transition ${initLoading ? "bg-gray-500 cursor-not-allowed" : "bg-primary text-black hover:opacity-90"}`}
          >
            {initLoading ? "Processing..." : balance === 0 ? "Set Units" : "Add Units"}
          </button>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray-700 w-full md:max-w-none transition duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.08)] hover:-translate-y-1">
          <h2 className="text-gray-400 text-sm mb-3">Electricity Cost (₦ per unit)</h2>

          <input
            type="number"
            placeholder="Enter cost per unit (e.g. 50)"
            value={costPerUnit || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              setCostPerUnit(value);
              localStorage.setItem("costPerUnit", String(value));
            }}
            className="w-full px-4 py-3 rounded-xl bg-dark border border-gray-600 text-white mb-3 focus:outline-none focus:border-yellow-400 transition"
          />

          <div className="text-sm text-gray-400">
            Total Units Used: <span className="text-white font-semibold">{totalUnitsUsed}</span>
          </div>

          <div className="text-lg font-bold text-primary mt-2">
            Estimated Cost: ₦{estimatedCost.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mb-4 mt-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white">Overview</h2>
        <p className="text-sm text-gray-400 mt-1">
          Track electricity balance, predictions, and daily usage activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 items-start">
        <div className="w-full sm:max-w-none xl:max-w-md transition duration-300 hover:-translate-y-1">
          <BalanceCard remaining={balance} />
          <p className="text-xs text-gray-400 mt-2">
            Remaining electricity (kWh) — matches your meter reading
          </p>
        </div>

        <div className="w-full sm:max-w-none xl:max-w-md transition duration-300 hover:-translate-y-1">
          <PredictionCard 
            avgPerDay={prediction.avgPerDay}
            daysLeft={prediction.estimatedDaysLeft}
          />
        </div>

        <div className="w-full sm:col-span-2 xl:col-span-1 sm:max-w-none xl:max-w-md transition duration-300 hover:-translate-y-1">
          <UsageInput onSubmit={handleUsageSubmit} />
        </div>

        <div className="sm:col-span-2 xl:col-span-3 w-full bg-card border border-gray-700 rounded-2xl p-5 md:p-6 mt-4 transition duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.06)]">
          <div className="mb-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Usage Insights
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Monitor electricity consumption trends and understand your usage patterns over time.
            </p>
          </div>

          <UsageChart data={history} />
        </div>
      </div>
    </div>
  );
}