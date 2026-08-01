"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Mail, 
  TrendingUp, 
  MousePointerClick, 
  AlertCircle, 
  UserMinus,
  FileText,
  Plus,
  ArrowUpRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const [metrics] = useState({
    totalSubscribers: 1420,
    todaySubscribers: 18,
    monthlyGrowthRate: 12.4,
    openRate: 48.6,
    clickRate: 14.2,
    bounceRate: 0.8,
    unsubscribeRate: 0.2,
  });

  const [recentSubscribers] = useState([
    { id: "1", name: "Shweta", email: "pandyashweta.in@gmail.com", date: "Today", status: "SUBSCRIBED" },
    { id: "2", name: "Alex Rivers", email: "alex.rivers@example.com", date: "Yesterday", status: "SUBSCRIBED" },
    { id: "3", name: "Elena Vance", email: "elena@vance.io", date: "2 days ago", status: "SUBSCRIBED" },
    { id: "4", name: "Marcus Wright", email: "mwright@domain.com", date: "3 days ago", status: "UNVERIFIED" },
  ]);

  return (
    <div className="min-h-screen bg-[#070709] text-white p-6 sm:p-10 selection:bg-[#222226]">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#222228]/60">
        <div>
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest bg-white/10 text-white font-medium rounded-full">
              Skxie Admin
            </span>
            <span className="text-xs text-zinc-500">v1.0.0</span>
          </div>
          <h1 className="text-3xl font-light font-serif-italic italic mt-2">Dashboard Overview</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/newsletters/new"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white text-black hover:bg-[#E5E5E5] transition-all rounded-lg text-xs font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Newsletter</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#141418] border border-[#222228] hover:border-[#44444F] text-zinc-300 transition-all rounded-lg text-xs font-medium cursor-pointer"
          >
            <span>View Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="p-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Subscribers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-light">{metrics.totalSubscribers.toLocaleString()}</div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{metrics.monthlyGrowthRate}% this month</span>
          </div>
        </div>

        <div className="p-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Open Rate</span>
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-light">{metrics.openRate}%</div>
          <div className="text-xs text-zinc-500">Average across last 10 campaigns</div>
        </div>

        <div className="p-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Click Rate (CTR)</span>
            <MousePointerClick className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-light">{metrics.clickRate}%</div>
          <div className="text-xs text-zinc-500">Unique link clicks per open</div>
        </div>

        <div className="p-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Bounce & Unsub</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-light">{metrics.bounceRate}%</div>
          <div className="flex items-center space-x-2 text-xs text-zinc-400">
            <UserMinus className="w-3.5 h-3.5 text-zinc-500" />
            <span>{metrics.unsubscribeRate}% unsubscribed</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Navigation Sidebar */}
        <div className="space-y-3">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-3 p-4 bg-[#141418] border border-[#33333F] rounded-xl text-white font-medium text-xs transition-all"
          >
            <Users className="w-4 h-4 text-white" />
            <span>Overview & Activity</span>
          </Link>
          <Link
            href="/admin/subscribers"
            className="flex items-center space-x-3 p-4 bg-[#0E0E12] border border-[#222228]/70 hover:border-[#44444F] rounded-xl text-zinc-400 hover:text-white font-medium text-xs transition-all"
          >
            <Users className="w-4 h-4 text-zinc-500" />
            <span>Manage Subscribers & CSV</span>
          </Link>
          <Link
            href="/admin/newsletters"
            className="flex items-center space-x-3 p-4 bg-[#0E0E12] border border-[#222228]/70 hover:border-[#44444F] rounded-xl text-zinc-400 hover:text-white font-medium text-xs transition-all"
          >
            <FileText className="w-4 h-4 text-zinc-500" />
            <span>Newsletter Editor & Drafts</span>
          </Link>
        </div>

        {/* Recent Subscriber Activity */}
        <div className="lg:col-span-2 p-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#222228]/60 pb-4">
            <h2 className="text-base font-light font-serif-italic italic text-white">Recent Subscribers</h2>
            <Link href="/admin/subscribers" className="text-xs text-zinc-400 hover:text-white transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {recentSubscribers.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-4 bg-[#070709] border border-[#222228]/60 rounded-lg text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-medium text-white">{sub.name}</div>
                  <div className="text-zinc-500">{sub.email}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-zinc-500">{sub.date}</span>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded font-medium ${
                      sub.status === "SUBSCRIBED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
