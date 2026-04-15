import Link from "next/link";


function page() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Management System
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Welcome to the Contact Management System. Here you can manage all your
        contacts efficiently.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        View Contacts
      </Link>
    </div>
  );
}

export default page;
