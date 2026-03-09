import { MapPin, Clock, Shield, Smile, Coffee } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const userName = "Ola";
  const currentDay = "torsdag";
  const coffeeProgress = 3;
  const coffeeTotal = 5;

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Welcome message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            God morgen, {userName}! Klar for {currentDay}?
          </h1>
          <Link
            href="/dashboard/funnel"
            className="mt-3 inline-flex text-sm text-orange-400 transition-colors hover:text-orange-300"
          >
            Se uke-1 funnel baseline →
          </Link>
        </div>

        {/* Main card - Next Tour */}
        <div className="rounded-xl bg-slate-800 p-6 md:p-8">
          <div className="space-y-6">
            {/* Tour title */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Morgenbruddet - Torsdag
              </h2>
            </div>

            {/* Tour details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-lg">06:00 - 07:15</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-lg">Gamle Stavanger (Kanonene)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-gray-300">
                <Shield className="h-4 w-4" />
                No-drop
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-gray-300">
                <Smile className="h-4 w-4" />
                Rolig
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-gray-300">
                <Coffee className="h-4 w-4" />
                Kaffe inkludert
              </span>
            </div>

            {/* CTA Button */}
            <button className="w-full rounded-lg bg-green-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-600 md:w-auto md:px-8">
              Meld meg på (Garantert plass)
            </button>
          </div>
        </div>

        {/* Secondary card - Coffee Reward */}
        <div className="rounded-xl bg-slate-800 p-6 md:p-8">
          <div className="space-y-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-white">
              Din Kaffe-status hos Kanelsnurren
            </h3>

            {/* Progress visualization */}
            <div className="space-y-3">
              <div className="flex gap-3">
                {Array.from({ length: coffeeTotal }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                      index < coffeeProgress
                        ? "border-orange-400 bg-orange-400/20"
                        : "border-slate-600 bg-slate-700/50"
                    }`}
                  >
                    {index < coffeeProgress ? (
                      <Coffee className="h-7 w-7 text-orange-400" />
                    ) : (
                      <Coffee className="h-7 w-7 text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-300">
                {coffeeProgress}/{coffeeTotal} turer til gratis frokost
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
