import type { GiftStatus } from "@/data/gifts";

const SUPABASE_URL = (
  import.meta.env.VITE_SUPABASE_URL || "https://pnazdcxnhodhfksyttjq.supabase.co"
).replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_kvUSQGmovi_2fIRL3R8yWQ_M0wz7rd6";

interface GiftStatusRow {
  gift_id: number;
  status: GiftStatus;
}

function baseHeaders(accessToken?: string) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
  };
}

export async function loadGiftStatuses(): Promise<Record<number, GiftStatus>> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/gift_statuses?select=gift_id,status`,
    { headers: baseHeaders() },
  );

  if (!response.ok) {
    console.warn("Não foi possível carregar status dos presentes.");
    return {};
  }

  const rows = (await response.json()) as GiftStatusRow[];
  return rows.reduce<Record<number, GiftStatus>>((statusByGift, row) => {
    statusByGift[row.gift_id] = row.status;
    return statusByGift;
  }, {});
}

export async function signInAdmin(email: string, password: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login não autorizado.");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export async function saveGiftStatus(giftId: number, status: GiftStatus, accessToken: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/gift_statuses`, {
    method: "POST",
    headers: {
      ...baseHeaders(accessToken),
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ gift_id: giftId, status }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível salvar o status do presente.");
  }
}
