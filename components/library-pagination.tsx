import { ArrowLeft, ArrowRight } from "lucide-react";

export function LibraryPagination({ page, pages, position, onChange }: { page: number; pages: number; position: string; onChange: (page: number) => void }) {
  if (pages <= 1) return null;
  return <nav className="library-pagination" aria-label={"Bibliotheksseiten " + position}>
    <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Vorherige Bibliotheksseite"><ArrowLeft size={17} /><span>Zurück</span></button>
    <label htmlFor={"library-page-" + position}><span>Seite</span><select id={"library-page-" + position} value={page} onChange={(event) => onChange(Number(event.target.value))}>{Array.from({ length: pages }, (_, index) => <option value={index + 1} key={index}>{index + 1}</option>)}</select><span>von {pages}</span></label>
    <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Nächste Bibliotheksseite"><span>Weiter</span><ArrowRight size={17} /></button>
  </nav>;
}
