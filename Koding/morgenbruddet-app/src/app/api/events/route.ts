import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { allowedTrackedEvents } from "@/lib/funnel";

type Payload = {
  eventName?: string;
  props?: Record<string, unknown>;
  pagePath?: string;
  referrer?: string;
  userAgent?: string;
  occurredAt?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    const eventName = body.eventName?.trim();

    if (!eventName || !allowedTrackedEvents.has(eventName)) {
      return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("funnel_events").insert({
      event_name: eventName,
      event_props: body.props ?? {},
      page_path: body.pagePath ?? null,
      referrer: body.referrer ?? null,
      user_agent: body.userAgent ?? null,
      occurred_at: body.occurredAt ?? new Date().toISOString(),
    });

    if (error) {
      console.error("funnel_events insert error:", error);
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("events api error:", error);
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
