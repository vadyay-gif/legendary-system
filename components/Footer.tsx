### `components/Footer.tsx`
```tsx
export default function Footer() {
return (
<footer className="mt-20 border-t">
<div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 grid md:grid-cols-2 gap-4">
<div>
<div className="font-semibold text-slate-700">AI Ready</div>
<p className="mt-1">© {new Date().getFullYear()} AI Ready. All rights reserved.</p>
</div>
<div className="flex gap-4 md:justify-end">
<a href="#" className="hover:underline">Privacy</a>
<a href="#" className="hover:underline">Terms</a>
<a href="#" className="hover:underline">Contact</a>
</div>
</div>
</footer>
);
}
```
