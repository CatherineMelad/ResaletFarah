import { Info } from "lucide-react";
import React from "react";

export default function Donate() {
  return (
    <div className="py-32 px-5 md:px-20">
      <div className="flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary-600" />
        <div>
          <p className="font-medium text-primary-800">Donations coming soon</p>
          <p className="mt-1 text-sm text-primary-700">
            We&apos;re still setting up our payment system. Check back soon —
            your support means a lot to us!
          </p>
        </div>
      </div>
    </div>
  );
}
