import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { formatPrice, gifts, totalGiftValue, type GiftStatus } from "@/data/gifts";
import { loadGiftStatuses, saveGiftStatus, signInAdmin } from "@/lib/supabase-gifts";

const statusLabels: Record<GiftStatus, string> = {
  disponivel: "Disponível",
  pendente: "Pendente",
  presenteado: "Presenteado",
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Lista de Presentes" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [giftStatuses, setGiftStatuses] = useState<Record<number, GiftStatus>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingGiftId, setSavingGiftId] = useState<number | null>(null);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("gift-admin-token") || "";
    setAccessToken(savedToken);

    loadGiftStatuses()
      .then(setGiftStatuses)
      .finally(() => setLoading(false));
  }, []);

  const adminGifts = useMemo(
    () =>
      gifts.map((gift) => ({
        ...gift,
        status: giftStatuses[gift.id] || gift.status,
      })),
    [giftStatuses],
  );

  const giftedTotal = adminGifts
    .filter((gift) => gift.status === "presenteado")
    .reduce((total, gift) => total + gift.price, 0);

  const progressPercent = Math.min(100, Math.round((giftedTotal / totalGiftValue) * 100));

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await signInAdmin(email, password);
      window.localStorage.setItem("gift-admin-token", token);
      setAccessToken(token);
      setPassword("");
    } catch {
      setError("Não foi possível entrar. Confira e-mail e senha do usuário admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (giftId: number, status: GiftStatus) => {
    if (!accessToken) return;

    setError("");
    setSavingGiftId(giftId);

    try {
      await saveGiftStatus(giftId, status, accessToken);
      setGiftStatuses((current) => ({ ...current, [giftId]: status }));
    } catch {
      setError("Não foi possível salvar. Entre novamente e tente de novo.");
    } finally {
      setSavingGiftId(null);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("gift-admin-token");
    setAccessToken("");
  };

  if (!accessToken) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-sm border border-border rounded-2xl p-6 bg-card">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-3">Admin</p>
          <h1 className="font-serif text-3xl italic mb-6">Lista de Presentes</h1>

          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 mb-4 text-sm outline-none focus:border-primary"
            required
          />

          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 mb-5 text-sm outline-none focus:border-primary"
            required
          />

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary text-primary-foreground px-5 py-3 text-xs uppercase tracking-widest font-bold disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-3">Admin</p>
            <h1 className="font-serif text-4xl md:text-5xl italic">Lista de Presentes</h1>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-auto rounded-full border border-border px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-muted"
          >
            Sair
          </button>
        </header>

        <section className="mb-10 border border-border rounded-2xl p-5 bg-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Progresso da meta</p>
              <p className="font-serif text-3xl italic">{progressPercent}% completo</p>
            </div>
            <div className="w-full md:w-80 h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </section>

        {error && <p className="mb-6 rounded-xl bg-destructive/10 text-destructive px-4 py-3 text-sm">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {adminGifts.map((gift) => (
            <article key={gift.id} className="border border-border rounded-2xl bg-card p-4 flex gap-4">
              <img src={gift.image} alt={gift.name} className="w-24 h-24 rounded-xl object-cover bg-muted" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{gift.category}</p>
                    <h2 className="font-serif text-xl italic">{gift.name}</h2>
                  </div>
                  <p className="font-mono text-sm text-accent">R$ {formatPrice(gift.price)}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{gift.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(["disponivel", "pendente", "presenteado"] as GiftStatus[]).map((status) => {
                    const active = gift.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(gift.id, status)}
                        disabled={savingGiftId === gift.id || active}
                        className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:bg-muted"
                        } disabled:opacity-70`}
                      >
                        {savingGiftId === gift.id && !active ? "Salvando..." : statusLabels[status]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
