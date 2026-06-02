"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (hero) {
      requestAnimationFrame(() =>
        setTimeout(() => {
          hero.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
          document.getElementById("heroVisual")?.classList.add("in");
        }, 120)
      );
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .stagger").forEach((el) => {
      if (el.closest(".hero")) return;
      io.observe(el);
    });

    const onScroll = () => {
      const hdr = document.getElementById("hdr");
      if (!hdr) return;
      hdr.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
