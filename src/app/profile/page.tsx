import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfileDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  // Fetch user bookings and wishlist
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      bookings: { include: { coach: true } },
      savedCoaches: { include: { coach: true } }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-text">My Profile</h1>
            <p className="mt-2 text-brand-muted">{session.user.email}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition">
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-brand-text mb-6">My Bookings</h2>
            {!user?.bookings.length ? (
              <p className="text-brand-muted">No bookings yet.</p>
            ) : (
              <ul className="space-y-4">
                {user.bookings.map((booking) => (
                  <li key={booking.id} className="p-4 border border-gray-100 rounded-xl">
                    <p className="font-semibold text-brand-text">Session with {booking.coach?.name || "Standard Coach"}</p>
                    <p className="text-sm text-brand-muted">{new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}</p>
                    <span className="mt-2 inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                      {booking.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-brand-text mb-6">Wishlist / Saved Coaches</h2>
            {!user?.savedCoaches.length ? (
              <p className="text-brand-muted">You haven't saved any coaches yet.</p>
            ) : (
              <ul className="space-y-4">
                {user.savedCoaches.map((saved) => (
                  <li key={saved.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      {saved.coach?.imageUrl ? <img src={saved.coach.imageUrl} alt="" className="object-cover" /> : null}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text">{saved.coach?.name}</p>
                      <p className="text-sm text-brand-muted">{saved.coach?.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
