import { notFound } from "next/navigation";
import { JsonProductRepository } from "@/lib/repositories/products";
import { PublicNav } from "@/components/layout/PublicNav";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await new JsonProductRepository().getById(id);
  if (!p || !p.active) return notFound();
  return <><PublicNav/><main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="metal flex aspect-square items-center justify-center rounded-3xl text-5xl font-black text-white/10">{p.name}</div>
      <div className="py-6"><div className="text-xs tracking-[.4em] text-white/35">{p.category}</div><h1 className="mt-3 text-5xl font-black">{p.name}</h1><p className="mt-6 leading-7 text-white/55">{p.description}</p><div className="mt-8 text-3xl font-bold">{p.price.toFixed(2)} {p.currency}</div><div className="mt-4 text-sm text-white/45">{p.stock > 0 ? `${p.stock} en stock` : "Rupture de stock"}</div><button disabled={p.stock <= 0} className="mt-8 rounded-2xl bg-white px-7 py-3 font-bold text-black disabled:opacity-30">Acheter</button></div>
    </div>
  </main></>;
}