export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="inline-flex items-center gap-3">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#1599de] border-t-transparent" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </div>
  )
}


