export function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <details key={item.question} className="border-b border-border py-5">
          <summary className="py-2 text-[20px] font-semibold">
            {item.question}
          </summary>
          <p className="max-w-[65ch] py-3 text-graphite">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
