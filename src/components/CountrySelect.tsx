"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { CheckIcon, ChevronDownIcon } from "./icons";

export const countries = [
  { iso: "co", name: "Colombia", code: "57" },
  { iso: "mx", name: "México", code: "52" },
  { iso: "pe", name: "Perú", code: "51" },
  { iso: "ec", name: "Ecuador", code: "593" },
  { iso: "cl", name: "Chile", code: "56" },
  { iso: "ar", name: "Argentina", code: "54" },
  { iso: "ve", name: "Venezuela", code: "58" },
  { iso: "bo", name: "Bolivia", code: "591" },
  { iso: "py", name: "Paraguay", code: "595" },
  { iso: "uy", name: "Uruguay", code: "598" },
  { iso: "pa", name: "Panamá", code: "507" },
  { iso: "cr", name: "Costa Rica", code: "506" },
  { iso: "gt", name: "Guatemala", code: "502" },
  { iso: "sv", name: "El Salvador", code: "503" },
  { iso: "hn", name: "Honduras", code: "504" },
  { iso: "ni", name: "Nicaragua", code: "505" },
  { iso: "do", name: "Rep. Dominicana", code: "1" },
  { iso: "us", name: "Estados Unidos", code: "1" },
  { iso: "es", name: "España", code: "34" },
];

function Flag({ iso }: { iso: string }) {
  return (
    <Image
      src={`/flags/${iso}.png`}
      alt=""
      width={24}
      height={16}
      className="h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-white/10"
    />
  );
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/**
 * Selector de país con estilos propios, siguiendo el patrón ARIA
 * "select-only combobox": teclado (flechas, Inicio/Fin, Enter, Esc),
 * búsqueda escribiendo y lector de pantalla.
 * Cerrado muestra solo bandera + indicativo.
 */
export function CountrySelect({ defaultIso = "co", labelId }: { defaultIso?: string; labelId: string }) {
  const initial = Math.max(0, countries.findIndex((c) => c.iso === defaultIso));
  const [selectedIndex, setSelectedIndex] = useState(initial);
  const [activeIndex, setActiveIndex] = useState(initial);
  const [open, setOpen] = useState(false);

  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const selected = countries[selectedIndex];

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Mantener visible la opción activa
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function openList() {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function choose(index: number) {
    setSelectedIndex(index);
    setOpen(false);
    comboRef.current?.focus();
  }

  function onTypeahead(char: string) {
    const t = typeahead.current;
    window.clearTimeout(t.timer);
    t.text += normalize(char);
    t.timer = window.setTimeout(() => (t.text = ""), 600);

    const start = open ? activeIndex : selectedIndex;
    const order = [...countries.keys()].map((_, i) => (start + 1 + i) % countries.length);
    const match = order.find((i) => normalize(countries[i].name).startsWith(t.text));
    if (match === undefined) return;
    if (open) setActiveIndex(match);
    else setSelectedIndex(match);
  }

  function onKeyDown(e: KeyboardEvent) {
    const last = countries.length - 1;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        onTypeahead(e.key);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) onTypeahead(e.key);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-2">
      <input type="hidden" name="country" value={selected.code} />
      <input type="hidden" name="countryIso" value={selected.iso} />

      <div
        ref={comboRef}
        role="combobox"
        tabIndex={0}
        aria-labelledby={`${labelId} ${id}-value`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-opt-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex h-[50px] cursor-pointer items-center gap-2.5 rounded-xl border bg-ink-950/60 px-3.5 text-white transition outline-none select-none focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400/30 ${
          open ? "border-brand-400 ring-2 ring-brand-400/30" : "border-white/10 hover:border-white/20"
        }`}
      >
        <span id={`${id}-value`} className="sr-only">
          {selected.name}
        </span>
        <Flag iso={selected.iso} />
        <span aria-hidden="true" className="font-medium tabular-nums">+{selected.code}</span>
        <ChevronDownIcon className={`ml-auto size-4 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        className="absolute top-full left-0 z-30 mt-2 max-h-72 w-72 max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-ink-800 p-1.5 shadow-2xl shadow-black/60 [scrollbar-color:rgb(255_255_255/0.15)_transparent] [scrollbar-width:thin]"
      >
        {countries.map((c, i) => {
          const isSelected = i === selectedIndex;
          const isActive = i === activeIndex;
          return (
            <li
              key={c.iso}
              id={`${id}-opt-${i}`}
              data-index={i}
              role="option"
              aria-selected={isSelected}
              onPointerMove={() => setActiveIndex(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive ? "bg-white/[0.07] text-white" : "text-slate-300"
              }`}
            >
              <Flag iso={c.iso} />
              <span className={`min-w-0 flex-1 truncate ${isSelected ? "font-semibold text-white" : ""}`}>{c.name}</span>
              <span className="shrink-0 text-slate-500 tabular-nums">+{c.code}</span>
              <CheckIcon className={`size-4 shrink-0 text-brand-400 ${isSelected ? "" : "invisible"}`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
