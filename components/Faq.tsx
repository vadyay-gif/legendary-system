### `components/Faq.tsx`
```tsx
"use client";
import { useState } from "react";


export default function Faq({ q, a }: { q: string; a: string }) {
const [open, setOpen] = useState(false);
return (
<div className="rounded-2xl border bg-white p-4">
<button className="w-full text-left font-medium" onClick={()=>setOpen(!open)}>{q}</button>
{open && <p className="mt-2 text-sm text-slate-600">{a}</p>}
</div>
);
}
```
