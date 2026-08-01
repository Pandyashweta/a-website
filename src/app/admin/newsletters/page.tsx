"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Eye, 
  Smartphone, 
  Monitor, 
  Save, 
  Sparkles,
  Check,
  Code
} from "lucide-react";

export default function AdminNewsletterEditorPage() {
  const [title, setTitle] = useState("Chapter Release & Exclusive Preview");
  const [slug, setSlug] = useState("chapter-release-exclusive-preview");
  const [contentMarkdown, setContentMarkdown] = useState(
    `# Dear {{firstName}},\n\nWelcome to this month's official update from **skxie**.\n\nI am thrilled to announce that the latest chapter has officially dropped on Wattpad and Stck Me. Here is a small preview of what awaits:\n\n> "Silence settles over the room like velvet, thick with unsaid promises..."\n\nThank you for reading and being a part of this journey.\n\nWarmly,\n**skxie**\n\n[Unsubscribe]({{unsubscribe}})`
  );

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const [notification, setNotification] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const renderHtmlPreview = () => {
    // Simple markdown-to-html compiler demo
    let html = contentMarkdown
      .replace(/^# (.*$)/gim, '<h1 style="font-size:22px; font-weight:600; color:#111; margin-bottom:12px;">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote style="border-left:3px solid #111; padding-left:12px; font-style:italic; color:#444; margin:12px 0;">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#2563eb; text-decoration:underline;">$1</a>')
      .replace(/\n/g, '<br />');

    // Variable substitutions preview
    html = html
      .replace(/{{firstName}}/g, "Shweta")
      .replace(/{{email}}/g, "pandyashweta.in@gmail.com")
      .replace(/{{unsubscribe}}/g, "#");

    return html;
  };

  const handleSaveDraft = () => {
    setNotification("Newsletter draft saved successfully.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendTestEmail = () => {
    setIsSendingTest(true);
    setTimeout(() => {
      setIsSendingTest(false);
      setNotification("Test email sent to skxielol@gmail.com!");
      setTimeout(() => setNotification(null), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white p-6 sm:p-10 selection:bg-[#222226]">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#222228]/60">
        <div>
          <Link href="/admin/dashboard" className="flex items-center space-x-2 text-xs text-zinc-400 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-light font-serif-italic italic">Newsletter Studio</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#141418] border border-[#222228] hover:border-[#44444F] text-zinc-300 transition-all rounded-lg text-xs font-medium cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleSendTestEmail}
            disabled={isSendingTest}
            className="flex items-center space-x-2 px-4 py-2.5 bg-white text-black hover:bg-[#E5E5E5] transition-all rounded-lg text-xs font-medium cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSendingTest ? "Sending Test..." : "Send Test Email"}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="max-w-7xl mx-auto mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor & Preview Workspace */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Left Side: Editor Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">Newsletter Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#0E0E12] border border-[#222228]/70 focus:border-[#44444F] rounded-xl text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 bg-[#0E0E12] border border-[#222228]/70 focus:border-[#44444F] rounded-xl text-xs text-zinc-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Content (Markdown & HTML)</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setContentMarkdown(contentMarkdown + " {{firstName}}")}
                  className="px-2 py-1 bg-[#141418] hover:bg-[#222228] text-[10px] text-zinc-300 rounded border border-[#222228]"
                >
                  + {"{{firstName}}"}
                </button>
                <button
                  type="button"
                  onClick={() => setContentMarkdown(contentMarkdown + " {{unsubscribe}}")}
                  className="px-2 py-1 bg-[#141418] hover:bg-[#222228] text-[10px] text-zinc-300 rounded border border-[#222228]"
                >
                  + {"{{unsubscribe}}"}
                </button>
              </div>
            </div>

            <textarea
              rows={16}
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              className="w-full p-4 bg-[#0E0E12] border border-[#222228]/70 focus:border-[#44444F] rounded-xl text-xs text-white font-mono leading-relaxed focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Right Side: Responsive Email Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Live Email Preview</span>
            </span>

            <div className="flex items-center space-x-2 bg-[#0E0E12] p-1 border border-[#222228] rounded-lg">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded transition-colors ${previewDevice === "desktop" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded transition-colors ${previewDevice === "mobile" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-[#050507] p-6 border border-[#222228]/70 rounded-xl min-h-[500px]">
            <div
              className={`bg-white text-black p-8 rounded-xl transition-all duration-300 shadow-2xl overflow-y-auto ${
                previewDevice === "mobile" ? "w-[360px]" : "w-full max-w-xl"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: renderHtmlPreview() }}
                className="text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
