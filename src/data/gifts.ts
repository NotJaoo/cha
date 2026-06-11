import giftElectroluxIb51 from "@/assets/gift-electrolux-ib51.webp";
import giftElectroluxFe5gb from "@/assets/gift-electrolux-fe5gb.webp";
import giftMesaJantarLais from "@/assets/gift-mesa-jantar-lais.webp";
import giftOxfordChuvisco from "@/assets/gift-oxford-chuvisco.webp";
import giftSanduicheiraMondial from "@/assets/gift-sanduicheira-mondial.webp";
import giftAirfryerOven from "@/assets/gift-airfryer-oven.webp";
import giftMaquinaLavarElectrolux from "@/assets/gift-maquina-lavar-electrolux.webp";
import giftTanquinhoColormaq from "@/assets/gift-tanquinho-colormaq.webp";
import giftMarinex from "@/assets/gift-marinex.webp";
import giftSamsungTv from "@/assets/gift-samsung-tv.webp";

export type GiftStatus = "disponivel" | "presenteado" | "pendente";

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  productUrl?: string;
  status: GiftStatus;
}

export const gifts: Gift[] = [
  { id: 1, name: "Geladeira Electrolux IB51", description: "Frost Free Inverter 490L Experience Inverse branca", price: 3799, image: giftElectroluxIb51, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/geladeira-electrolux-frost-free-inverter-490l-experience-inverse-branca-ib51/p/dbbek1kfb0/ed/rinv/?partner_id=64853&seller_id=electrolux", status: "disponivel" },
  { id: 2, name: "Fogão Electrolux FE5IW", description: "5 bocas branco com mesa inox, PerfectCook e VaporBake", price: 1994, image: giftElectroluxFe5gb, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/fogao-5-bocas-electrolux-branco-efficient-mesa-inox-perfectcook-e-vaporbake-fe5iw/p/ba0c3jcd97/ed/fg5b/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=electrolux", status: "disponivel" },
  { id: 13, name: "Samsung Smart TV 43\"", description: "Crystal UHD 4K U8600F 2025", price: 1977, image: giftSamsungTv, category: "Eletrônicos", productUrl: "https://www.mercadolivre.com.br/samsung-smart-tv-43-crystal-uhd-4k-u8600f-2025/p/MLB48954919#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccd02e67-834c-41e4-b91f-2349c0300b38&wid=MLB4634107639&sid=search", status: "disponivel" },
  { id: 10, name: "Air Fryer Oven Digital", description: "Forno e fritadeira elétrica com painel digital", price: 422.1, image: giftAirfryerOven, category: "Eletroportáteis", productUrl: "https://www.mercadolivre.com.br/p/MLB45070708?matt_tool=38524122&pdp_filters=item_id:MLB3941733035&ua=SjqLxZvVz3RcZC9hHJE2aP_BrL_iMA#origin=share&sid=share&wid=MLB3941733035&action=whatsapp", status: "disponivel" },
  { id: 11, name: "Máquina de Lavar Electrolux 15kg", description: "Essential Care branca com cesto inox e Jet&Clean", price: 1999, image: giftMaquinaLavarElectrolux, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/maquina-de-lavar-electrolux-15kg-branca-essential-care-com-cesto-inox-e-jet-clean-led15/p/kee9b751fb/ed/lava/?partner_id=64853&seller_id=electrolux", status: "disponivel" },
  { id: 12, name: "Tanquinho Colormaq 10kg", description: "Lavadora semiautomática branca LCS 10 BR", price: 512.05, image: giftTanquinhoColormaq, category: "Eletrodomésticos", productUrl: "https://m.magazineluiza.com.br/tanquinho-de-lavar-roupas-semiautomatico-colormaq-10kg-lcs-10-br/p/224108400/ed/tank/?partner_id=64853&seller_id=magazineluiza", status: "disponivel" },
  { id: 9, name: "Multiprocessador Philco 9 em 1", description: "Com batedeira turbo 1700W na cor preta", price: 549, image: "https://philco.vtexassets.com/arquivos/ids/273597-800-auto?aspect=true&height=auto&v=638999494613570000&width=800", category: "Eletroportáteis", productUrl: "https://m.magazineluiza.com.br/multiprocessador-philco-9-em-1-com-batedeira-turbo-1700w-preto/p/bfeh78ecf7/ep/prsa/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=eletroimb", status: "disponivel" },
  { id: 3, name: "Mesa de Jantar 4 Cadeiras", description: "Retangular Naturalle e Off-White com tampo de vidro", price: 699.9, image: giftMesaJantarLais, category: "Móveis", productUrl: "https://m.magazineluiza.com.br/mesa-de-jantar-4-cadeiras-retangular-naturalle-e-off-white-tampo-de-vidro-lais-moveis-sao-carlos/p/238649900/mo/momj/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=magazineluiza", status: "disponivel" },
  { id: 14, name: "Conjunto Marinex", description: "Potes de vidro com tampas cinza", price: 134.9, image: giftMarinex, category: "Cozinha", productUrl: "https://www.mercadolivre.com.br/conjunto-assadeiras-6-pecas-de-vidro-com-tampa-cinza-marinex/p/MLB28025230?pdp_filters=item_id%3AMLB5525354376", status: "disponivel" },
  { id: 7, name: "Aparelho de Jantar Oxford", description: "Flat Chuvisco com jantar e chá em 30 peças", price: 550.9, image: giftOxfordChuvisco, category: "Mesa", productUrl: "https://www.mercadolivre.com.br/aparelho-de-jantar-e-cha-30-pecas-oxford-flat-chuvisco/p/MLB32817818?pdp_filters=item_id%3AMLB3609891985", status: "disponivel" },
  { id: 8, name: "Sanduicheira Mondial S-12", description: "Fast Grill & Sandwich preta 750W antiaderente", price: 79, image: giftSanduicheiraMondial, category: "Eletroportáteis", productUrl: "https://m.magazineluiza.com.br/sanduicheira-mondial-fast-grill-sandwich-s-12-preta-750w-antiaderente/p/236687800/ep/gset/?partner_id=64853&utm_source=pdp_desk&utm_medium=share&seller_id=magazineluiza", status: "disponivel" },
];

export const totalGiftValue = gifts.reduce((total, gift) => total + gift.price, 0);

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
