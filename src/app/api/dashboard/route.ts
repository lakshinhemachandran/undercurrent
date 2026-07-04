import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type DashboardAction =
  | { action: "saveMood"; mood: number }
  | { action: "saveJournal"; note: string };

async function getCurrentTherapyLog(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("therapy_logs")
    .select("id, mood_history, journal_entries, streak_days, unlocked_pings, therapist_name, next_session_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data) {
    return { supabase, log: data };
  }

  const { data: created, error } = await supabase
    .from("therapy_logs")
    .insert({ user_id: userId, mood_history: [3], journal_entries: [] })
    .select("id, mood_history, journal_entries, streak_days, unlocked_pings, therapist_name, next_session_at")
    .single();

  if (error || !created) {
    throw error ?? new Error("Failed to initialize therapy log.");
  }

  return { supabase, log: created };
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      return NextResponse.json({ error: "You must be signed in to save dashboard data." }, { status: 401 });
    }

    const body = (await request.json()) as DashboardAction;
    const { log, supabase: scopedSupabase } = await getCurrentTherapyLog(user.id);

    if (body.action === "saveMood") {
      const currentHistory = Array.isArray(log.mood_history) ? log.mood_history : [];
      const nextHistory = [body.mood, ...currentHistory.filter((item) => item !== body.mood)].slice(0, 7);

      const { error } = await scopedSupabase.from("therapy_logs").update({ mood_history: nextHistory }).eq("id", log.id);

      if (error) {
        throw error;
      }

      return NextResponse.json({ ok: true, moodHistory: nextHistory });
    }

    const trimmedNote = body.note.trim();
    const entry = { at: new Date().toISOString(), note: trimmedNote };
    const currentEntries = Array.isArray(log.journal_entries) ? log.journal_entries : [];
    const nextEntries = [...currentEntries, entry].slice(-20);

    const { error } = await scopedSupabase.from("therapy_logs").update({ journal_entries: nextEntries }).eq("id", log.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true, journalEntries: nextEntries });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Could not save dashboard data."
      },
      { status: 500 }
    );
  }
}