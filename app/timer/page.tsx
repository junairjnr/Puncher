// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Clock,
  Coffee,
  Zap,
  Smile,
  Battery,
  Sun,
  Moon,
  BatteryLow,
} from "lucide-react";
import TenorGif from "../Components/Bear";

export default function Timer() {
  const [punchLines, setPunchLines] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"day" | "night">("day");

  const API_BASE =
    "https://timecalculator-deebf4apfbhvenca.canadacentral-01.azurewebsites.net/api/Punch/calculate?punchData=";

  const today = format(new Date(), "dd-MMM-yyyy");

  const handleInputChange = (value: string) => {
    setPunchLines([value]);
  };

  const calculate = async () => {
    const validPunches = punchLines.map((s) => s.trim()).filter(Boolean);

    const query = validPunches.join(" ");
    const url = API_BASE + encodeURIComponent(query);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(url, { timeout: 10000 });
      setResult(res.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "API had a tantrum... try again! 😤"
      );
    } finally {
      setLoading(false);
    }
  };

  //   // Auto-fill example on first load
  useEffect(() => {
    setPunchLines([
      `${today} 9:00:00 AM`,
      `${today} 1:18:32 PM`,
      `${today} 1:46:04 PM`,
    ]);
  }, []);

  const extractHours = (text: string) => {
    const match = text.match(/(\d+) Hours?/i);
    return match ? match[1] : "0";
  };

  const extractMinutes = (text: string) => {
    const match = text.match(/(\d+) Minutes?/i);
    return match ? match[1] : "0";
  };

  const extractTargetTime = (text: string) => {
    const match = text.match(/at (.+)$/i);
    return match ? match[1].trim() : "—";
  };

  return (
    <main
      className={`min-h-screen ${theme === "day" ? "day-mode" : "night-mode"}`}
    >
      <div className="comic-container">
        <header className="header-comic">
          <h1>
            <Zap size={48} className="inline mr-3 spin-slow" />
            PUNCH TIME CALCULATOR
            <Smile size={44} className="inline ml-3 bounce" />
          </h1>
          <p className="subtitle">
            Because time is money… and naps are sacred 😴
          </p>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "day" ? "night" : "day")}
            aria-label="toggle theme"
          >
            {theme === "day" ? <Moon /> : <Sun />}
          </button>
        </header>

        <section className="input-panel">
          <div className="speech-bubble">
            Enter your punches
            <div className="bubble-tail" />
          </div>

          <div className="punch-row comic-input-wrapper">
            <textarea
              value={punchLines}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`Give here your punch 🥊`}
              className="comic-input"
            />
          </div>

          <button
            onClick={calculate}
            disabled={loading}
            className={`btn-calc comic-btn big ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <span className="loading-dots">
                ദയവായി കാത്തിരിക്കുക..,
                <span>നിങ്ങളുടെ വിരലടയാളം പരിശോധിക്കുന്നു </span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              "ഇവിടെ അമർത്തുക...! ⚡"
            )}
          </button>
        </section>

        {error && (
          <div className="error-box comic-boom">
            <strong>OOPS!</strong> {error}
          </div>
        )}

        {result && result.data && result.data.completionTime && (
          <section className="result-panel comic-result boom">
            <div className="result-title">ശ്രദ്ധിക്ക് മകനേ ..!🙏</div>

            <div className="deficit-comic">
              {/* Stats cards */}
              <div className="punch-stats">
                <div className="stat-item deficit">
                  <BatteryLow size={64} className="icon shake" />
                  <div className="big-number">
                    {extractHours(result.data.completionTime)}h{" "}
                    {extractMinutes(result.data.completionTime)}m
                  </div>
                  <div className="label">ഇത്രേ ആയൊള്ളൂ</div>
                </div>

                <div className="stat-item target">
                  <Clock size={64} className="icon spin" />
                  <div className="label">YOU COULD'VE HIT 8 HOURS AT</div>
                  <div className="big-number target-time">
                    {extractTargetTime(result.data.completionTime)}
                  </div>
                </div>
              </div>

              {/* Comic-style verdict */}
              <div className="comic-verdict">
                {parseInt(extractHours(result.data.completionTime), 8) >= 8
                  ? "8 housr ആയാ ഇറങ്ങി പോടാ നാറി .... 🪄✨"
                  : "ക്ഷമിക്കൂ  കുഞ്ഞാടേ,..ഇനിയും  ഇരുന്ന് മൂഞ്ചാനുണ്ട്....💪"}
                {/* //   : parseInt(extractHours(result.data.completionTime), 8) >= 2
                    ? "ക്ഷമിക്കൂ  കുഞ്ഞാടേ ..ഇനിയും  ഇരുന്ന് മുഞ്ചാനുണ്ട് ....💪" */}
              </div>

              {/* Encouragement line */}
              <div className="motivation">
                മകനേ...ഒഴിവ് സമയങ്ങളിൽ കാട്ടിൽ പോയി കരടിയെ 🐻 വേട്ടയാടുക .....!
              </div>
            </div>

            {/* Fun debug toggle */}
            {/* <details className="raw-debug"> */}
            {/* <summary>Show raw API response (nerd mode activated) 🤓</summary> */}
            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
            {/* </details> */}
          </section>
        )}

        <footer className="comic-footer">
          <div>
            Made with rage, coffee and Next.js • {new Date().getFullYear()}
          </div>

          <div className="bear-gif">
            <TenorGif />
          </div>
        </footer>
      </div>
    </main>
  );
}
