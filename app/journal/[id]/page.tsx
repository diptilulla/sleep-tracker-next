import getJournalEntry from "@/app/actions/getJournalEntry";
import Link from "next/link";

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const {error, entry} = await getJournalEntry(id);
    if (error) {
    return (
      <div className='bg-red-100 text-red-800 border border-red-300 rounded-md p-4 text-center'>
        <p>{error}</p>
        <Link
          href="/journal"
          className="text-purple-600 hover:underline text-sm mt-2 block"
        >
          ← Back to Journal
        </Link>
      </div>
      
    );
  }

  return (
    
    <div className="max-w-2xl mx-auto p-6">
      <Link
        href="/journal"
        className="text-purple-600 hover:underline text-sm"
      >
        ← Back to Journal
      </Link>
      {/* Title */}
      <h1 className="mt-5 text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        {entry?.title}
      </h1>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
        {/* Date + Mood */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-3">
          {entry?.date && <p>{new Date(entry.date).toLocaleDateString("en-US")}</p>}
          {entry?.mood && <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              ["😵 Restless", "😰 Overwhelmed", "😟 Anxious", "😤 Frustrated", "😢 Sad", "😔 Lonely", "😡 Angry"].includes(
                entry.mood
              )
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {entry.mood}
          </span>}
        </div>

        {entry?.content && <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />}
        </div>
    </div>
  );
}
