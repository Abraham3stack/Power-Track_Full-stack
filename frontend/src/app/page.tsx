"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 animate-[fadeIn_0.6s_ease-out]">
        <div className="relative flex items-center gap-3 mb-4">
          <div className="absolute -inset-6 bg-yellow-400/10 blur-2xl rounded-full animate-pulse"></div>
          {/* Lightning SVG Icon */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#facc15">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">
            {isLoggedIn ? "Welcome Back ⚡" : "PowerTrack"}
          </h1>
        </div>

        <p className="text-lg text-gray-300 max-w-3xl mb-6 leading-relaxed">
          {isLoggedIn
            ? "Continue tracking your electricity usage, monitor consumption trends, estimate costs, and optimize your daily energy habits from your dashboard."
            : "Track your electricity usage in real time, estimate energy costs, predict how long your units will last, and reduce unnecessary power consumption before it becomes expensive."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 max-w-2xl mb-10 text-left">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡</span>
                <span>Smart tracking active</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">📊</span>
                <span>Usage insights available</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💰</span>
                <span>Cost estimation enabled</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🧠</span>
                <span>Energy planner ready</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡</span>
                <span>Predict remaining electricity duration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💰</span>
                <span>Estimate electricity costs instantly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">📊</span>
                <span>Monitor daily usage trends</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🧠</span>
                <span>Plan appliance energy consumption</span>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:bg-yellow-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="border border-yellow-400 px-6 py-3 rounded-lg transition transform hover:scale-105 hover:bg-yellow-400 hover:text-black"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:bg-yellow-300"
              >
                Dashboard
              </Link>

              <Link
                href="/planner"
                className="border border-yellow-400 px-6 py-3 rounded-lg transition transform hover:scale-105 hover:bg-yellow-400 hover:text-black"
              >
                ⚡ Plan Usage
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      {!isLoggedIn && (
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10 text-yellow-400">
          Smart Features Built For Everyday Electricity Tracking
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-[#1e293b] rounded-xl border border-transparent hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:-translate-y-1 transition duration-300">
            <h3 className="font-semibold mb-2">Track Units</h3>
            <p className="text-sm text-gray-400">
              Input your electricity units and monitor how much you have left in real time.
            </p>
          </div>

          <div className="p-6 bg-[#1e293b] rounded-xl border border-transparent hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:-translate-y-1 transition duration-300">
            <h3 className="font-semibold mb-2">Log Usage</h3>
            <p className="text-sm text-gray-400">
              Record daily usage to understand your consumption habits.
            </p>
          </div>

          <div className="p-6 bg-[#1e293b] rounded-xl border border-transparent hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:-translate-y-1 transition duration-300">
            <h3 className="font-semibold mb-2">Predict Duration</h3>
            <p className="text-sm text-gray-400">
              Get insights on how many days your electricity will last based on usage.
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Dashboard Preview */}
      <section className="px-5 sm:px-6 py-16 md:py-20 max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm mb-6">
              ⚡ Smart Electricity Monitoring
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 leading-tight mb-6 max-w-xl">
              Smart Electricity Dashboard
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Monitor remaining electricity units, log daily usage, receive smart predictions, and understand your energy consumption habits from one intelligent dashboard.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="bg-[#1e293b] border border-yellow-400/20 px-4 py-2 rounded-full text-sm text-yellow-300 shadow-sm hover:border-yellow-400 transition">
                ⚡ 24/7 Monitoring
              </div>

              <div className="bg-[#1e293b] border border-yellow-400/20 px-4 py-2 rounded-full text-sm text-yellow-300 shadow-sm hover:border-yellow-400 transition">
                💰 Cost Estimation
              </div>

              <div className="bg-[#1e293b] border border-yellow-400/20 px-4 py-2 rounded-full text-sm text-yellow-300 shadow-sm hover:border-yellow-400 transition">
                📊 Smart Predictions
              </div>
            </div>

            <div className="space-y-4 w-full max-w-xl">
              <div className="flex items-start text-left gap-3 sm:gap-4">
                <span className="text-yellow-400 text-xl">⚡</span>
                <div>
                  <h3 className="font-semibold">Real-Time Usage Tracking</h3>
                  <p className="text-sm text-gray-400">
                    Track how quickly your electricity units are being consumed.
                  </p>
                </div>
              </div>

              <div className="flex items-start text-left gap-3 sm:gap-4">
                <span className="text-yellow-400 text-xl">📊</span>
                <div>
                  <h3 className="font-semibold">Consumption Insights</h3>
                  <p className="text-sm text-gray-400">
                    Understand trends and predict how long your electricity will last.
                  </p>
                </div>
              </div>

              <div className="flex items-start text-left gap-3 sm:gap-4">
                <span className="text-yellow-400 text-xl">💰</span>
                <div>
                  <h3 className="font-semibold">Smart Cost Estimation</h3>
                  <p className="text-sm text-gray-400">
                    Estimate electricity spending based on your usage habits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Dashboard Preview */}
          <div className="relative order-2 mt-4 lg:mt-0 flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-yellow-400/10 blur-3xl rounded-full"></div>

            <div className="relative bg-black/40 p-2 rounded-2xl border border-gray-800 shadow-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(250,204,21,0.12)] transition duration-300 animate-[float_6s_ease-in-out_infinite] w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="/dashboard-preview.png"
                  alt="Dashboard preview"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PowerTrack? */}
      {!isLoggedIn && (
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-12">
          Why PowerTrack?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)] hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">⚡ Real-Time Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              Track your remaining electricity units and monitor how quickly your power is being consumed.
            </p>
          </div>
          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)] hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">💰 Cost Estimation</h3>
            <p className="text-gray-400 leading-relaxed">
              Estimate electricity spending based on your unit consumption and tariff rates.
            </p>
          </div>
          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)] hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">📊 Smart Insights</h3>
            <p className="text-gray-400 leading-relaxed">
              Understand usage patterns with predictions and intelligent electricity depletion alerts.
            </p>
          </div>
          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)] hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">🧠 Energy Planning</h3>
            <p className="text-gray-400 leading-relaxed">
              Simulate appliance usage to discover which devices consume the most electricity daily.
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Navigation Hint */}
      <section className="text-center pb-16">
        <p className="text-gray-500 text-sm">
          Track your electricity usage, monitor trends, and plan smarter energy consumption.
        </p>
      </section>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}