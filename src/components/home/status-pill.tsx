/** Static status pill (the animated version lives in status-board.tsx). Colours: Approved/Paid = orange-ink fill, In review = tint, Submitted = outline. */
export type Status = "Submitted" | "In review" | "Approved" | "Paid";

const styles: Record<Status, string> = {
  Submitted: "bg-white text-muted ring-1 ring-inset ring-line",
  "In review": "bg-tint-2 text-ink",
  Approved: "bg-orange-ink text-white",
  Paid: "bg-orange-ink text-white",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-flex min-w-[6.25rem] justify-center whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium leading-none ${styles[status]}`}>
      {status}
    </span>
  );
}
