export default function TableChip({ number }) {
  if (!number) return null;

  return (
    <span className="table-chip" aria-label={`Mesa ${number}`}>
      MESA {number}
    </span>
  );
}