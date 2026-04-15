"use client";

import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(b64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

type Status = "idle" | "loading" | "subscribed" | "denied" | "unsupported";

export default function PushSubscribeButton() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") setStatus("denied");
    // Check if already subscribed
    navigator.serviceWorker.getRegistration("/sw.js").then(async (reg) => {
      if (!reg) return;
      const sub = await reg.pushManager.getSubscription();
      if (sub) setStatus("subscribed");
    });
  }, []);

  async function handleSubscribe() {
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!key) return;

    setStatus("loading");
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      // Wait for SW to be ready
      await navigator.serviceWorker.ready;

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });

      setStatus("subscribed");
    } catch {
      if (Notification.permission === "denied") {
        setStatus("denied");
      } else {
        setStatus("idle");
      }
    }
  }

  if (status === "unsupported" || status === "denied") return null;

  if (status === "subscribed") {
    return (
      <span
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
        style={{ background: "rgba(200,245,60,0.12)", color: "var(--acc)", border: "1px solid rgba(200,245,60,0.2)" }}
      >
        ✓ Notifications on
      </span>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={status === "loading"}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:opacity-80 disabled:opacity-50"
      style={{ background: "var(--surf2)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
    >
      {status === "loading" ? (
        <>
          <span className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
          Subscribing…
        </>
      ) : (
        <>🔔 Notify me of new posts</>
      )}
    </button>
  );
}
