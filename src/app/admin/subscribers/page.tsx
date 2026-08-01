"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Download, 
  Upload, 
  Trash2, 
  Tag as TagIcon, 
  Plus, 
  ArrowLeft,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { SubscriberData } from "@/types";

export default function AdminSubscribersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribers, setSubscribers] = useState<SubscriberData[]>([
    { id: "1", firstName: "Shweta", email: "pandyashweta.in@gmail.com", status: "SUBSCRIBED", createdAt: "2026-08-01", tags: ["VIP", "Early Access"] },
    { id: "2", firstName: "Alex Rivers", email: "alex.rivers@example.com", status: "SUBSCRIBED", createdAt: "2026-07-28", tags: ["Reader"] },
    { id: "3", firstName: "Elena Vance", email: "elena@vance.io", status: "SUBSCRIBED", createdAt: "2026-07-15", tags: ["Collaborator"] },
    { id: "4", firstName: "Marcus Wright", email: "mwright@domain.com", status: "UNVERIFIED", createdAt: "2026-07-10", tags: [] },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.firstName && sub.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter((s) => s.id !== id));
    setNotification("Subscriber removed successfully.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,First Name,Email,Status,Created At"].join(",") +
      "\n" +
      subscribers
        .map((s) => `${s.id},"${s.firstName || ""}",${s.email},${s.status},${s.createdAt}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skxie_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white p-6 sm:p-10 selection:bg-[#222226]">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#222228]/60">
        <div>
          <Link href="/admin/dashboard" className="flex items-center space-x-2 text-xs text-zinc-400 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-light font-serif-italic italic">Subscriber Management</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#141418] border border-[#222228] hover:border-[#44444F] text-zinc-300 transition-all rounded-lg text-xs font-medium cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <label className="flex items-center space-x-2 px-4 py-2.5 bg-white text-black hover:bg-[#E5E5E5] transition-all rounded-lg text-xs font-medium cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNotification(`Imported file "${e.target.files[0].name}" successfully.`);
                  setTimeout(() => setNotification(null), 3000);
                }
              }}
            />
          </label>
        </div>
      </div>

      {notification && (
        <div className="max-w-7xl mx-auto mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search & Stats Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0E0E12] border border-[#222228]/70 focus:border-[#44444F] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="text-xs text-zinc-400">
          Showing <span className="text-white font-medium">{filteredSubscribers.length}</span> of{" "}
          <span className="text-white font-medium">{subscribers.length}</span> subscribers
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="max-w-7xl mx-auto mt-6 bg-[#0E0E12] border border-[#222228]/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-[#141418] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-[#222228]/60">
              <tr>
                <th className="px-6 py-4 font-medium">Subscriber</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Subscribed Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222228]/40">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#141418]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{sub.firstName || "Anonymous"}</div>
                    <div className="text-zinc-500 text-[11px]">{sub.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded font-medium ${
                        sub.status === "SUBSCRIBED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {sub.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] bg-[#1A1A22] text-zinc-400 border border-[#33333F] rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{sub.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteSubscriber(sub.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors rounded-md hover:bg-rose-500/10 cursor-pointer"
                      title="Remove Subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
