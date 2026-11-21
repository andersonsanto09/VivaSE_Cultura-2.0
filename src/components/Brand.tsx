// VivaSE brand mark shared by the platform portal and every experience.
// It always points to the platform home (#/), the entry of the whole VivaSE.
export default function Brand({ label = 'VivaSE Cultura — página inicial da plataforma' }: { label?: string }) {
  return <a className="brand" href="#/" aria-label={label} title="Página inicial do VivaSE"><span className="brand-name">Viva<span>SE</span><svg className="brand-spark" aria-hidden="true" width="29" height="29" viewBox="0 0 30 30" fill="none" stroke="currentColor"><path d="M15 1v28M1 15h28M5 5l20 20M5 25 25 5" /></svg></span><span className="brand-label">Cultura</span></a>;
}
