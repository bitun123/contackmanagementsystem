import Link from "next/link";

function page() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 ">Contact Management System</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the Contact Management System. Here you can manage all your
        contacts efficiently.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Contacts
      </Link>
    </div>
  );
}

export default page;
