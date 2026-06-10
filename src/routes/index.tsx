import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Countdown } from "@/components/Countdown";
import { ScrollReveal } from "@/components/ScrollReveal";

import coupleHero from "@/assets/couple-hero.jpg";
import giftJantar from "@/assets/gift-jantar.jpg";
import giftCama from "@/assets/gift-cama.jpg";
import giftMicroondas from "@/assets/gift-microondas.jpg";
import giftGeladeira from "@/assets/gift-geladeira.jpg";
import giftElectroluxIb51 from "@/assets/gift-electrolux-ib51.webp";
import giftElectroluxFe5gb from "@/assets/gift-electrolux-fe5gb.webp";
import giftMesaJantarLais from "@/assets/gift-mesa-jantar-lais.webp";
import giftOxfordChuvisco from "@/assets/gift-oxford-chuvisco.webp";
import giftSanduicheiraMondial from "@/assets/gift-sanduicheira-mondial.webp";
import gallery0 from "@/assets/gallery-0.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

// ─── Data ───────────────────────────────────────────────

interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  productUrl?: string;
  status: "disponivel" | "presenteado" | "pendente";
}

const gifts: Gift[] = [
  { id: 1, name: "Geladeira Electrolux IB51", description: "Frost Free Inverter 490L Experience Inverse branca", price: 3799, image: giftElectroluxIb51, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/geladeira-electrolux-frost-free-inverter-490l-experience-inverse-branca-ib51/p/dbbek1kfb0/ed/rinv/?partner_id=64853&seller_id=electrolux", status: "disponivel" },
  { id: 2, name: "Fogão Electrolux FE5GB", description: "5 bocas preto com mesa de vidro, PerfectCook e grades de ferro", price: 1959, image: giftElectroluxFe5gb, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/fogao-5-bocas-electrolux-preto-efficient-mesa-de-vidro-perfectcook-e-grades-de-ferro-fe5gb/p/jd81e27413/ed/pcfg/?partner_id=64853&seller_id=electrolux", status: "disponivel" },
  { id: 3, name: "Mesa de Jantar 4 Cadeiras", description: "Retangular Naturalle e Off-White com tampo de vidro", price: 699.9, image: giftMesaJantarLais, category: "Móveis", productUrl: "https://m.magazineluiza.com.br/mesa-de-jantar-4-cadeiras-retangular-naturalle-e-off-white-tampo-de-vidro-lais-moveis-sao-carlos/p/238649900/mo/momj/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=magazineluiza", status: "disponivel" },
  { id: 4, name: "Cama Box Queen Size", description: "Colchão ortopédico + base box", price: 1800, image: giftCama, category: "Quarto", status: "disponivel" },
  { id: 5, name: "Micro-ondas Inox", description: "30L com grill e 10 programas", price: 550, image: giftMicroondas, category: "Eletrodomésticos", status: "disponivel" },
  { id: 6, name: "Geladeira French Door", description: "538L inox com dispenser de água", price: 3200, image: giftGeladeira, category: "Eletrodomésticos", status: "disponivel" },
  { id: 7, name: "Aparelho de Jantar Oxford", description: "Flat Chuvisco com jantar e chá em 30 peças", price: 550.9, image: giftOxfordChuvisco, category: "Mesa", productUrl: "https://www.mercadolivre.com.br/aparelho-de-jantar-e-cha-30-pecas-oxford-flat-chuvisco/p/MLB32817818?pdp_filters=item_id%3AMLB3609891985", status: "disponivel" },
  { id: 8, name: "Sanduicheira Mondial S-12", description: "Fast Grill & Sandwich preta 750W antiaderente", price: 79, image: giftSanduicheiraMondial, category: "Eletroportáteis", productUrl: "https://m.magazineluiza.com.br/sanduicheira-mondial-fast-grill-sandwich-s-12-preta-750w-antiaderente/p/236687800/ep/gset/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=magazineluiza", status: "disponivel" },
  { id: 9, name: "Multiprocessador Philco 9 em 1", description: "Com batedeira turbo 1700W na cor preta", price: 299.9, image: "https://philco.vtexassets.com/arquivos/ids/273597-800-auto?aspect=true&height=auto&v=638999494613570000&width=800", category: "Eletroportáteis", productUrl: "https://m.magazineluiza.com.br/multiprocessador-philco-9-em-1-com-batedeira-turbo-1700w-preto/p/bfeh78ecf7/ep/prsa/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=eletroimb", status: "disponivel" },
];

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  align: "left" | "right";
}

const timeline: TimelineEvent[] = [
  { date: "Maio 2019", title: "O Primeiro Encontro", description: "Um café despretensioso que se transformou em horas de conversa ininterrupta. Ali soubemos que seria especial.", align: "left" },
  { date: "Agosto 2019", title: "O Pedido de Namoro", description: "Sob as estrelas, finalmente oficializamos o que o coração já sabia há meses.", align: "right" },
  { date: "Dezembro 2024", title: "O Noivado", description: "Um pedido surpresa cercado de família e amigos, marcando o início da nossa nova jornada.", align: "left" },
  { date: "Outubro 2026", title: "O Casamento", description: "O dia em que nossas almas se unirão oficialmente. O grande sim!", align: "right" },
];

const galleryImages = [
  { src: gallery0, alt: "João e Laisa na praia" },
  { src: gallery1, alt: "João e Laisa sorrindo juntos" },
  { src: gallery2, alt: "João e Laisa na praia" },
  { src: gallery3, alt: "João e Laisa em foto no espelho" },
];

interface Message {
  id: number;
  name: string;
  city?: string;
  text: string;
  featured?: boolean;
}

const messages: Message[] = [
  { id: 1, name: "Maria Oliveira", city: "São Paulo", text: "Que a caminhada de vocês seja repleta de luz e conquistas! Mal posso esperar para ver a casinha nova." },
  { id: 2, name: "Ana Luísa", city: "Curitiba", text: "Tão lindo ver esse sonho se tornando realidade. Vocês merecem toda a felicidade do mundo!" },
  { id: 3, name: "Ricardo Silva", text: "Muitas felicidades nessa nova fase! Cada detalhe da lista é a cara de vocês." },
  { id: 4, name: "Marina e Pedro", city: "Rio de Janeiro", text: "Mal posso esperar pelo 'Open House'! Um grande beijo para o casal mais lindo." },
];

const PIX_KEY = "joao.laisa.cha@email.com";
const GOAL_TOTAL = 15000;
const GOAL_CURRENT = 5250;
const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ─── Sub-components ───────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
      {children}
    </span>
  );
}

function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-3xl md:text-5xl italic leading-tight text-balance ${className}`}>
      {children}
    </h2>
  );
}

// ─── Main Page ────────────────────────────────────────

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chá de Cozinha Online | João & Laisa" },
      { name: "description", content: "Ajude João e Laisa a construírem seu novo lar. Escolha um presente, envie uma mensagem especial e acompanhe a contagem regressiva para o casamento." },
      { property: "og:title", content: "Chá de Cozinha Online | João & Laisa" },
      { property: "og:description", content: "Ajude João e Laisa a construírem seu novo lar. Escolha um presente, envie uma mensagem especial e acompanhe a contagem regressiva para o casamento." },
    ],
  }),
  component: Index,
});

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [pixModalGift, setPixModalGift] = useState<Gift | null>(null);
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCity, setGuestCity] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestbookSent, setGuestbookSent] = useState(false);

  const navLinks = [
    { href: "#galeria", label: "Galeria" },
    { href: "#presentes", label: "Lista de Presentes" },
    { href: "#pix", label: "Contribuir" },
    { href: "#recados", label: "Mural" },
  ];

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim() && guestMessage.trim()) {
      setGuestbookSent(true);
      setGuestName("");
      setGuestCity("");
      setGuestMessage("");
      setTimeout(() => setGuestbookSent(false), 4000);
    }
  };

  const progressPercent = Math.min(100, Math.round((GOAL_CURRENT / GOAL_TOTAL) * 100));

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* ─── Navigation ─── */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-xl italic tracking-tight">J&L</a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#presentes"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-[11px] uppercase tracking-widest font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            Presentear
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
              ) : (
                <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-block border-b border-accent/40 pb-2 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    10 de Outubro, 2026
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-balance mb-6">
                  João <span className="text-primary italic">&</span> Laisa
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
                  Construindo nosso lar com amor e a doçura de novos começos.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="#presentes"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Ver Lista de Presentes
                  </a>
                  <a
                    href="#pix"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-border rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-muted transition-colors"
                  >
                    Contribuir com Pix
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={150}>
                <div className="relative group">
                  <img
                    src={coupleHero}
                    alt="João e Laisa"
                    width={1200}
                    height={1600}
                    className="h-auto w-full rounded-2xl"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Countdown ─── */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <SectionLabel>Contagem Regressiva</SectionLabel>
              <SectionTitle>Até o grande dia</SectionTitle>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <Countdown />
          </ScrollReveal>
          <p className="text-center mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            10 de Outubro de 2026
          </p>
        </div>
      </section>


      {/* ─── Gallery ─── */}
      <section id="galeria" className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionLabel>Momentos Especiais</SectionLabel>
              <SectionTitle>Galeria de Fotos</SectionTitle>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gift List ─── */}
      <section id="presentes" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <SectionLabel>Mimos para nossa Casa</SectionLabel>
                <SectionTitle>Lista de Presentes</SectionTitle>
              </div>
              <div className="md:text-right">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                  Meta do Lar
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-40 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-sm text-accent font-medium">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, i) => (
              <ScrollReveal key={gift.id} delay={i * 100}>
                <div className="group bg-card border border-border/40 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      loading="lazy"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {gift.status === "presenteado" && (
                      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 rounded-full text-xs uppercase tracking-widest font-bold text-muted-foreground">
                          Presenteado
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{gift.category}</p>
                    <h4 className="font-serif text-lg italic mb-1">{gift.name}</h4>
                    <p className="text-xs text-muted-foreground mb-4">{gift.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-lg text-accent font-medium">
                        R$ {formatPrice(gift.price)}
                      </span>
                      {gift.status === "disponivel" ? (
                        gift.productUrl ? (
                          <div className="flex items-center gap-2">
                            <a
                              href={gift.productUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 text-[11px] uppercase tracking-widest font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                            >
                              Comprar
                            </a>
                            <button
                              onClick={() => setPixModalGift(gift)}
                              className="px-4 py-2 text-[11px] uppercase tracking-widest font-bold border border-border rounded-full hover:bg-muted transition-colors"
                            >
                              Pix
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPixModalGift(gift)}
                            className="px-5 py-2 text-[11px] uppercase tracking-widest font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                          >
                            Presentear
                          </button>
                        )
                      ) : (
                        <span className="px-5 py-2 text-[11px] uppercase tracking-widest font-bold text-muted-foreground bg-muted rounded-full">
                          {gift.status === "presenteado" ? "Presenteado" : "Pendente"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Meta do Lar (Progress) ─── */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <SectionLabel>Construção do Lar</SectionLabel>
            <SectionTitle className="mb-4">Nossa Meta</SectionTitle>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Cada presente e cada contribuição nos aproxima do nosso sonho. Veja como estamos indo!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-6 text-2xl font-serif italic text-accent">
                {progressPercent}% completo
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Pix Contribution ─── */}
      <section id="pix" className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <SectionLabel>Contribuição Livre</SectionLabel>
                <SectionTitle className="mb-6">Contribua com qualquer valor</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Prefere nos ajudar com um valor livre para a montagem do nosso lar? Ficaremos imensamente gratos! Sua contribuição via Pix é muito bem-vinda.
                </p>

                <div className="bg-card border border-border/40 rounded-2xl p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Chave Pix
                    </span>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 bg-muted px-4 py-3 rounded-xl text-sm font-mono break-all">
                        {PIX_KEY}
                      </code>
                      <button
                        onClick={handleCopyPix}
                        className="shrink-0 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
                      >
                        {copied ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Banco
                    </span>
                    <p className="text-sm text-foreground">Itaú Unibanco</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Titular
                    </span>
                    <p className="text-sm text-foreground">João da Silva</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8">
                  <div className="w-56 h-56 md:w-64 md:h-64 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 3v18" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">
                        QR Code Pix
                      </span>
                      <span className="text-[10px] text-muted-foreground/60 block mt-1">
                        Atualize com seu QR
                      </span>
                    </div>
                  </div>
                  <p className="text-center mt-4 text-xs text-muted-foreground">
                    Escaneie para pagar
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Guestbook ─── */}
      <section id="recados" className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionLabel>Livro de Memórias</SectionLabel>
              <SectionTitle>Mural de Carinho</SectionTitle>
            </div>
          </ScrollReveal>

          {/* Messages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {messages.map((msg, i) => (
              <ScrollReveal key={msg.id} delay={i * 100}>
                <div className={`bg-card border border-border/30 rounded-2xl p-6 md:p-8 relative ${msg.featured ? "ring-2 ring-primary/20" : ""}`}>
                  {msg.featured && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-[9px] uppercase tracking-widest font-bold rounded-full">
                      Destaque
                    </span>
                  )}
                  <p className="font-serif text-lg md:text-xl italic leading-relaxed text-balance mb-6">
                    &ldquo;{msg.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-px bg-accent/50" />
                    <span className="text-sm font-medium text-accent">{msg.name}</span>
                    {msg.city && (
                      <span className="text-xs text-muted-foreground">· {msg.city}</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Form */}
          <ScrollReveal>
            <div className="max-w-xl mx-auto bg-card border border-border/40 rounded-2xl p-6 md:p-8">
              <h3 className="font-serif text-xl italic text-center mb-6">Deixe seu recado</h3>
              {guestbookSent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-serif italic text-lg">Mensagem enviada com sucesso!</p>
                  <p className="text-sm text-muted-foreground mt-2">Aguardando moderação para aparecer no mural.</p>
                </div>
              ) : (
                <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-muted/50 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Cidade (opcional)"
                      value={guestCity}
                      onChange={(e) => setGuestCity(e.target.value)}
                      className="w-full px-4 py-3 bg-muted/50 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <textarea
                    placeholder="Sua mensagem carinhosa..."
                    rows={4}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-muted/50 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Enviar Mensagem
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground">
                    Sua mensagem será revisada antes de aparecer publicamente.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-serif text-3xl md:text-4xl italic mb-4">João & Laisa</p>
          <div className="flex justify-center gap-6 mb-6">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            10.10.2026 · Construído com amor
          </p>
        </div>
      </footer>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-background/80 hover:text-background transition-colors p-2"
            onClick={() => setLightboxIndex(null)}
            aria-label="Fechar"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18" /><path d="M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-full">
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              aria-label="Anterior"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {lightboxIndex < galleryImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              aria-label="Próxima"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* ─── Pix Modal ─── */}
      {pixModalGift && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPixModalGift(null)}
        >
          <div
            className="bg-background rounded-3xl max-w-md w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setPixModalGift(null)}
              aria-label="Fechar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <img
                src={pixModalGift.image}
                alt={pixModalGift.name}
                className="w-24 h-24 object-cover rounded-xl mx-auto mb-4"
              />
              <h3 className="font-serif text-xl italic mb-1">{pixModalGift.name}</h3>
              <p className="font-mono text-2xl text-accent font-medium">
                R$ {formatPrice(pixModalGift.price)}
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mb-4 text-center">
              <div className="w-40 h-40 bg-card border-2 border-dashed border-border mx-auto rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 3v18" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground block">
                    QR Code Pix
                  </span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Escaneie para pagar
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-muted/50 px-4 py-3 rounded-xl">
                <span className="text-xs text-muted-foreground">Chave Pix</span>
                <code className="text-xs font-mono">{PIX_KEY}</code>
              </div>
              <button
                onClick={handleCopyPix}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                {copied ? "Copiado!" : "Copiar Chave Pix"}
              </button>
            </div>

            <p className="text-center text-[10px] text-muted-foreground mt-4">
              Após o pagamento, envie o comprovante para confirmação.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
